ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS account_owner TEXT,
  ADD COLUMN IF NOT EXISTS main_contact TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS billing_address TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE suppliers
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS main_contact TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS framework_status TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE sites
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS postcode TEXT,
  ADD COLUMN IF NOT EXISTS dno_area TEXT,
  ADD COLUMN IF NOT EXISTS idno_area TEXT,
  ADD COLUMN IF NOT EXISTS voltage_level_sought TEXT,
  ADD COLUMN IF NOT EXISTS load_required_kva NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS export_required_kva NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS battery_included BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS charger_count INTEGER,
  ADD COLUMN IF NOT EXISTS charger_type TEXT,
  ADD COLUMN IF NOT EXISTS target_energisation_date DATE,
  ADD COLUMN IF NOT EXISTS budget NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS internal_owner TEXT,
  ADD COLUMN IF NOT EXISTS next_action TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;

CREATE TABLE IF NOT EXISTS dno_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  dno_reference TEXT,
  application_date DATE,
  quote_received_date DATE,
  quote_expiry_date DATE,
  connection_offer_status TEXT NOT NULL DEFAULT 'Requested',
  point_of_connection_summary TEXT,
  capacity_offered_kva NUMERIC(12,2),
  cost_ex_vat NUMERIC(12,2),
  reinforcement_cost NUMERIC(12,2),
  contestable_amount NUMERIC(12,2),
  non_contestable_amount NUMERIC(12,2),
  delivery_timeframe_days INTEGER,
  accepted BOOLEAN NOT NULL DEFAULT FALSE,
  acceptance_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS idno_tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  tender_issue_date DATE,
  tender_return_date DATE,
  tender_expiry_date DATE,
  status TEXT NOT NULL DEFAULT 'Requested',
  gross_adoptable_works_value NUMERIC(12,2),
  asset_value_payment NUMERIC(12,2),
  non_contestable_cost NUMERIC(12,2),
  contestable_cost NUMERIC(12,2),
  delivery_duration_days INTEGER,
  adoption_assumptions TEXT,
  programme_assumptions TEXT,
  accepted BOOLEAN NOT NULL DEFAULT FALSE,
  acceptance_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS icp_tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  tender_issue_date DATE,
  tender_return_date DATE,
  tender_expiry_date DATE,
  status TEXT NOT NULL DEFAULT 'Requested',
  contestable_works_cost NUMERIC(12,2),
  exclusions TEXT,
  delivery_duration_days INTEGER,
  delivery_assumptions TEXT,
  accepted BOOLEAN NOT NULL DEFAULT FALSE,
  acceptance_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dno_quotes_site_id ON dno_quotes(site_id);
CREATE INDEX IF NOT EXISTS idx_dno_quotes_supplier_id ON dno_quotes(supplier_id);
CREATE INDEX IF NOT EXISTS idx_dno_quotes_status ON dno_quotes(connection_offer_status);
CREATE INDEX IF NOT EXISTS idx_idno_tenders_site_id ON idno_tenders(site_id);
CREATE INDEX IF NOT EXISTS idx_idno_tenders_supplier_id ON idno_tenders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_idno_tenders_status ON idno_tenders(status);
CREATE INDEX IF NOT EXISTS idx_icp_tenders_site_id ON icp_tenders(site_id);
CREATE INDEX IF NOT EXISTS idx_icp_tenders_supplier_id ON icp_tenders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_icp_tenders_status ON icp_tenders(status);

DROP TRIGGER IF EXISTS trg_dno_quotes_updated_at ON dno_quotes;
CREATE TRIGGER trg_dno_quotes_updated_at BEFORE UPDATE ON dno_quotes
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_idno_tenders_updated_at ON idno_tenders;
CREATE TRIGGER trg_idno_tenders_updated_at BEFORE UPDATE ON idno_tenders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_icp_tenders_updated_at ON icp_tenders;
CREATE TRIGGER trg_icp_tenders_updated_at BEFORE UPDATE ON icp_tenders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
