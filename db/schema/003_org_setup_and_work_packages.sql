ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS company_address TEXT,
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS business_type TEXT,
  ADD COLUMN IF NOT EXISTS default_delivery_model TEXT,
  ADD COLUMN IF NOT EXISTS setup_completed_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS site_work_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  package_type TEXT NOT NULL,
  managed_by_type TEXT NOT NULL DEFAULT 'internal',
  managed_by_supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'Not Started',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (site_id, package_type)
);

CREATE INDEX IF NOT EXISTS idx_site_work_packages_site_id ON site_work_packages(site_id);
CREATE INDEX IF NOT EXISTS idx_site_work_packages_package_type ON site_work_packages(package_type);
CREATE INDEX IF NOT EXISTS idx_site_work_packages_managed_by_supplier_id ON site_work_packages(managed_by_supplier_id);

DROP TRIGGER IF EXISTS trg_site_work_packages_updated_at ON site_work_packages;
CREATE TRIGGER trg_site_work_packages_updated_at BEFORE UPDATE ON site_work_packages
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

INSERT INTO site_work_packages (site_id, package_type, managed_by_type, status)
SELECT
  sites.id,
  package_defaults.package_type,
  'internal',
  'Not Started'
FROM sites
CROSS JOIN (
  VALUES
    ('dno_quote'),
    ('idno_tender'),
    ('icp_tender'),
    ('civil_tender')
) AS package_defaults(package_type)
ON CONFLICT (site_id, package_type) DO NOTHING;
