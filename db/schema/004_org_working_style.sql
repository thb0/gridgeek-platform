ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS working_style TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'organizations_working_style_check'
  ) THEN
    ALTER TABLE organizations
      ADD CONSTRAINT organizations_working_style_check
      CHECK (working_style IN ('customer_first', 'site_first') OR working_style IS NULL);
  END IF;
END $$;
