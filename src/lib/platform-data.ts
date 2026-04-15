import { redirect } from "next/navigation";
import { getDatabaseTime, getDbPool } from "@/lib/db";

export const BUSINESS_TYPES = ["CPO", "ICP", "Solar", "BESS"] as const;
export const DELIVERY_MODELS = [
  "manage_all_packages",
  "appoint_icp_for_some_packages",
  "act_as_icp_for_clients"
] as const;
export const WORKING_STYLES = ["customer_first", "site_first"] as const;
export const WORK_PACKAGE_TYPES = [
  "dno_quote",
  "idno_tender",
  "icp_tender",
  "civil_tender"
] as const;
export const MANAGED_BY_TYPES = [
  "internal",
  "icp",
  "consultant",
  "external",
  "not_required"
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type DeliveryModel = (typeof DELIVERY_MODELS)[number];
export type WorkingStyle = (typeof WORKING_STYLES)[number];
export type WorkPackageType = (typeof WORK_PACKAGE_TYPES)[number];
export type ManagedByType = (typeof MANAGED_BY_TYPES)[number];

export type OrganizationProfile = {
  id: string;
  name: string;
  companyAddress: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  businessType: BusinessType | null;
  defaultDeliveryModel: DeliveryModel | null;
  workingStyle: WorkingStyle | null;
  setupCompletedAt: string | null;
};

export type DashboardMetrics = {
  activeSites: number;
  quotesOutstanding: number;
  tendersOutstanding: number;
  quotesExpiringSoon: number;
  acceptedThisMonth: number;
  averageDnoReturnDays: number | null;
  averageIdnoNetValue: number | null;
  averageIcpTenderValue: number | null;
  databaseTime: string | null;
};

export type CustomerListItem = {
  id: string;
  name: string;
  accountOwner: string | null;
  status: string;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  activeSites: number;
  totalQuotedValue: number;
  totalAcceptedValue: number;
  lastActivityAt: string | null;
};

export type CustomerDetail = {
  id: string;
  name: string;
  accountOwner: string | null;
  status: string;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  billingAddress: string | null;
  notes: string | null;
  sites: SiteListItem[];
};

export type SupplierListItem = {
  id: string;
  name: string;
  supplierType: string;
  region: string | null;
  frameworkStatus: string | null;
  liveOpportunityCount: number;
  winCount: number;
  averageReturnDays: number | null;
};

export type SupplierDetail = {
  id: string;
  name: string;
  supplierType: string;
  region: string | null;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  frameworkStatus: string | null;
  notes: string | null;
  performance: {
    liveOpportunityCount: number;
    winCount: number;
    averageReturnDays: number | null;
  };
  dnoQuotes: DnoQuoteRow[];
  idnoTenders: IdnoTenderRow[];
  icpTenders: IcpTenderRow[];
};

export type SiteWorkPackage = {
  id: string;
  packageType: WorkPackageType;
  managedByType: ManagedByType;
  managedBySupplierId: string | null;
  managedBySupplierName: string | null;
  status: string;
  notes: string | null;
};

export type SiteListItem = {
  id: string;
  name: string;
  customerId: string | null;
  customerName: string | null;
  postcode: string | null;
  dnoArea: string | null;
  loadRequiredKva: number | null;
  status: string;
  dnoQuoteStatus: string | null;
  idnoTenderStatus: string | null;
  icpTenderStatus: string | null;
  nextAction: string;
  internalOwner: string | null;
  workPackages: SiteWorkPackage[];
};

export type SiteDetail = {
  id: string;
  name: string;
  customerId: string | null;
  customerName: string | null;
  address: string | null;
  postcode: string | null;
  dnoArea: string | null;
  idnoArea: string | null;
  status: string;
  voltageLevelSought: string | null;
  loadRequiredKva: number | null;
  exportRequiredKva: number | null;
  batteryIncluded: boolean;
  chargerCount: number | null;
  chargerType: string | null;
  targetEnergisationDate: string | null;
  budget: number | null;
  internalOwner: string | null;
  nextAction: string | null;
  notes: string | null;
  workPackages: SiteWorkPackage[];
  comparison: SiteComparison;
  dnoQuotes: DnoQuoteRow[];
  idnoTenders: IdnoTenderRow[];
  icpTenders: IcpTenderRow[];
};

export type DnoQuoteRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  dnoReference: string | null;
  applicationDate: string | null;
  quoteReceivedDate: string | null;
  quoteExpiryDate: string | null;
  status: string;
  costExVat: number | null;
  capacityOfferedKva: number | null;
  deliveryTimeframeDays: number | null;
  accepted: boolean;
  acceptanceDate: string | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  budgetVariance: number | null;
  notes: string | null;
};

export type IdnoTenderRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  tenderIssueDate: string | null;
  tenderReturnDate: string | null;
  tenderExpiryDate: string | null;
  status: string;
  grossAdoptableWorksValue: number | null;
  assetValuePayment: number | null;
  nonContestableCost: number | null;
  contestableCost: number | null;
  netCostToBusiness: number | null;
  deliveryDurationDays: number | null;
  accepted: boolean;
  acceptanceDate: string | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  notes: string | null;
};

export type IcpTenderRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  tenderIssueDate: string | null;
  tenderReturnDate: string | null;
  tenderExpiryDate: string | null;
  status: string;
  contestableWorksCost: number | null;
  deliveryDurationDays: number | null;
  accepted: boolean;
  acceptanceDate: string | null;
  exclusions: string | null;
  deliveryAssumptions: string | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  notes: string | null;
};

export type CommercialComparisonListItem = {
  siteId: string;
  siteName: string;
  customerName: string | null;
  budget: number | null;
  dnoDirectCost: number | null;
  bestIdnoNetCost: number | null;
  bestIcpCost: number | null;
  lowestNetCost: number | null;
  fastestRouteDays: number | null;
  recommendedRoute: string;
  budgetVariance: number | null;
  expiryPressure: string;
};

export type SiteComparison = {
  dnoDirectCost: number | null;
  bestIdnoNetCost: number | null;
  bestIcpCost: number | null;
  lowestNetCost: number | null;
  fastestRouteDays: number | null;
  recommendedRoute: string;
  budgetVariance: number | null;
  expiryPressure: string;
};

type DashboardRow = {
  activeSites: string;
  quotesOutstanding: string;
  tendersOutstanding: string;
  quotesExpiringSoon: string;
  acceptedThisMonth: string;
  averageDnoReturnDays: number | null;
  averageIdnoNetValue: number | null;
  averageIcpTenderValue: number | null;
};

type OrganizationProfileRow = {
  id: string;
  name: string;
  companyAddress: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  businessType: BusinessType | null;
  defaultDeliveryModel: DeliveryModel | null;
  workingStyle: WorkingStyle | null;
  setupCompletedAt: Date | null;
};

type CustomerListRow = {
  id: string;
  name: string;
  accountOwner: string | null;
  status: string;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  activeSites: string;
  totalQuotedValue: number | null;
  totalAcceptedValue: number | null;
  lastActivityAt: Date | null;
};

type CustomerDetailRow = {
  id: string;
  name: string;
  accountOwner: string | null;
  status: string;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  billingAddress: string | null;
  notes: string | null;
};

type SupplierListRow = {
  id: string;
  name: string;
  supplierType: string;
  region: string | null;
  frameworkStatus: string | null;
  liveOpportunityCount: string;
  winCount: string;
  averageReturnDays: number | null;
};

type SupplierDetailRow = {
  id: string;
  name: string;
  supplierType: string;
  region: string | null;
  mainContact: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  frameworkStatus: string | null;
  notes: string | null;
  liveOpportunityCount: string;
  winCount: string;
  averageReturnDays: number | null;
};

type SiteListRow = {
  id: string;
  name: string;
  customerId: string | null;
  customerName: string | null;
  postcode: string | null;
  dnoArea: string | null;
  loadRequiredKva: number | null;
  status: string;
  dnoQuoteStatus: string | null;
  idnoTenderStatus: string | null;
  icpTenderStatus: string | null;
  nextAction: string;
  internalOwner: string | null;
};

type SiteDetailRow = {
  id: string;
  name: string;
  customerId: string | null;
  customerName: string | null;
  address: string | null;
  postcode: string | null;
  dnoArea: string | null;
  idnoArea: string | null;
  status: string;
  voltageLevelSought: string | null;
  loadRequiredKva: number | null;
  exportRequiredKva: number | null;
  batteryIncluded: boolean | null;
  chargerCount: number | null;
  chargerType: string | null;
  targetEnergisationDate: Date | null;
  budget: number | null;
  internalOwner: string | null;
  nextAction: string | null;
  notes: string | null;
};

type WorkPackageRow = {
  id: string;
  siteId: string;
  packageType: WorkPackageType;
  managedByType: ManagedByType;
  managedBySupplierId: string | null;
  managedBySupplierName: string | null;
  status: string;
  notes: string | null;
};

type DnoQuoteQueryRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  dnoReference: string | null;
  applicationDate: Date | null;
  quoteReceivedDate: Date | null;
  quoteExpiryDate: Date | null;
  status: string;
  costExVat: number | null;
  capacityOfferedKva: number | null;
  deliveryTimeframeDays: number | null;
  accepted: boolean;
  acceptanceDate: Date | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  budgetVariance: number | null;
  notes: string | null;
};

type IdnoTenderQueryRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  tenderIssueDate: Date | null;
  tenderReturnDate: Date | null;
  tenderExpiryDate: Date | null;
  status: string;
  grossAdoptableWorksValue: number | null;
  assetValuePayment: number | null;
  nonContestableCost: number | null;
  contestableCost: number | null;
  netCostToBusiness: number | null;
  deliveryDurationDays: number | null;
  accepted: boolean;
  acceptanceDate: Date | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  notes: string | null;
};

type IcpTenderQueryRow = {
  id: string;
  siteId: string;
  siteName: string;
  supplierId: string;
  supplierName: string;
  tenderIssueDate: Date | null;
  tenderReturnDate: Date | null;
  tenderExpiryDate: Date | null;
  status: string;
  contestableWorksCost: number | null;
  deliveryDurationDays: number | null;
  accepted: boolean;
  acceptanceDate: Date | null;
  exclusions: string | null;
  deliveryAssumptions: string | null;
  daysToReturn: number | null;
  daysToExpiry: number | null;
  notes: string | null;
};

type ComparisonRow = {
  siteId: string;
  siteName: string;
  customerName: string | null;
  budget: number | null;
  dnoDirectCost: number | null;
  bestIdnoNetCost: number | null;
  bestIcpCost: number | null;
  fastestRouteDays: number | null;
  earliestExpiryDays: number | null;
};

export async function getPrimaryOrganizationProfile(): Promise<OrganizationProfile | null> {
  const pool = getDbPool();
  const result = await pool.query<OrganizationProfileRow>(`
    SELECT
      id,
      name,
      company_address AS "companyAddress",
      contact_name AS "contactName",
      contact_email AS "contactEmail",
      contact_phone AS "contactPhone",
      business_type AS "businessType",
      default_delivery_model AS "defaultDeliveryModel",
      working_style AS "workingStyle",
      setup_completed_at AS "setupCompletedAt"
    FROM organizations
    ORDER BY created_at ASC
    LIMIT 1
  `);

  const organization = result.rows[0];
  if (!organization) return null;

  return {
    id: organization.id,
    name: organization.name,
    companyAddress: organization.companyAddress,
    contactName: organization.contactName,
    contactEmail: organization.contactEmail,
    contactPhone: organization.contactPhone,
    businessType: organization.businessType,
    defaultDeliveryModel: organization.defaultDeliveryModel,
    workingStyle: organization.workingStyle,
    setupCompletedAt: organization.setupCompletedAt?.toISOString() ?? null
  };
}

export async function requireOrganizationSetup() {
  const organization = await getPrimaryOrganizationProfile().catch(() => null);
  if (!organization || !organization.setupCompletedAt) {
    redirect("/setup");
  }
  return organization;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const pool = getDbPool();
  const [metricsResult, databaseTime] = await Promise.all([
    pool.query<DashboardRow>(`
      WITH combined_expiry AS (
        SELECT quote_expiry_date AS expiry_date, connection_offer_status AS status, accepted
        FROM dno_quotes
        UNION ALL
        SELECT tender_expiry_date AS expiry_date, status, accepted
        FROM idno_tenders
        UNION ALL
        SELECT tender_expiry_date AS expiry_date, status, accepted
        FROM icp_tenders
      )
      SELECT
        (SELECT COUNT(*)::text FROM sites WHERE status NOT IN ('Energised', 'Closed')) AS "activeSites",
        (SELECT COUNT(*)::text FROM dno_quotes WHERE connection_offer_status IN ('Requested', 'Clarification Needed', 'Under Review')) AS "quotesOutstanding",
        (
          SELECT COUNT(*)::text
          FROM (
            SELECT status FROM idno_tenders
            UNION ALL
            SELECT status FROM icp_tenders
          ) tender_statuses
          WHERE status IN ('Requested', 'Clarification Needed', 'Under Review')
        ) AS "tendersOutstanding",
        (
          SELECT COUNT(*)::text
          FROM combined_expiry
          WHERE accepted = FALSE
            AND status NOT IN ('Rejected', 'Expired')
            AND expiry_date IS NOT NULL
            AND expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '14 days'
        ) AS "quotesExpiringSoon",
        (
          SELECT COUNT(*)::text
          FROM (
            SELECT acceptance_date FROM dno_quotes WHERE accepted = TRUE
            UNION ALL
            SELECT acceptance_date FROM idno_tenders WHERE accepted = TRUE
            UNION ALL
            SELECT acceptance_date FROM icp_tenders WHERE accepted = TRUE
          ) accepted_rows
          WHERE acceptance_date >= date_trunc('month', CURRENT_DATE)
        ) AS "acceptedThisMonth",
        (
          SELECT AVG((quote_received_date - application_date)::double precision)
          FROM dno_quotes
          WHERE application_date IS NOT NULL AND quote_received_date IS NOT NULL
        ) AS "averageDnoReturnDays",
        (
          SELECT AVG((COALESCE(contestable_cost, 0) + COALESCE(non_contestable_cost, 0) - COALESCE(asset_value_payment, 0))::double precision)
          FROM idno_tenders
        ) AS "averageIdnoNetValue",
        (
          SELECT AVG(contestable_works_cost::double precision)
          FROM icp_tenders
        ) AS "averageIcpTenderValue"
    `),
    getDatabaseTime()
  ]);

  const row = metricsResult.rows[0];
  return {
    activeSites: Number(row?.activeSites ?? 0),
    quotesOutstanding: Number(row?.quotesOutstanding ?? 0),
    tendersOutstanding: Number(row?.tendersOutstanding ?? 0),
    quotesExpiringSoon: Number(row?.quotesExpiringSoon ?? 0),
    acceptedThisMonth: Number(row?.acceptedThisMonth ?? 0),
    averageDnoReturnDays: row?.averageDnoReturnDays ?? null,
    averageIdnoNetValue: row?.averageIdnoNetValue ?? null,
    averageIcpTenderValue: row?.averageIcpTenderValue ?? null,
    databaseTime
  };
}

export async function getCustomerList(): Promise<CustomerListItem[]> {
  const pool = getDbPool();
  const result = await pool.query<CustomerListRow>(`
    WITH site_stats AS (
      SELECT
        customer_id,
        COUNT(*) FILTER (WHERE status NOT IN ('Energised', 'Closed'))::text AS active_sites,
        MAX(updated_at) AS last_site_activity
      FROM sites
      GROUP BY customer_id
    ),
    offer_rows AS (
      SELECT
        s.customer_id,
        COALESCE(d.cost_ex_vat, 0)::double precision AS quoted_value,
        CASE WHEN d.accepted THEN COALESCE(d.cost_ex_vat, 0)::double precision ELSE 0 END AS accepted_value,
        d.updated_at AS activity_at
      FROM sites s
      INNER JOIN dno_quotes d ON d.site_id = s.id
      UNION ALL
      SELECT
        s.customer_id,
        (COALESCE(i.contestable_cost, 0) + COALESCE(i.non_contestable_cost, 0) - COALESCE(i.asset_value_payment, 0))::double precision AS quoted_value,
        CASE
          WHEN i.accepted THEN (COALESCE(i.contestable_cost, 0) + COALESCE(i.non_contestable_cost, 0) - COALESCE(i.asset_value_payment, 0))::double precision
          ELSE 0
        END AS accepted_value,
        i.updated_at AS activity_at
      FROM sites s
      INNER JOIN idno_tenders i ON i.site_id = s.id
      UNION ALL
      SELECT
        s.customer_id,
        COALESCE(c.contestable_works_cost, 0)::double precision AS quoted_value,
        CASE WHEN c.accepted THEN COALESCE(c.contestable_works_cost, 0)::double precision ELSE 0 END AS accepted_value,
        c.updated_at AS activity_at
      FROM sites s
      INNER JOIN icp_tenders c ON c.site_id = s.id
    ),
    quote_totals AS (
      SELECT
        customer_id,
        SUM(quoted_value)::double precision AS total_quoted_value,
        SUM(accepted_value)::double precision AS total_accepted_value,
        MAX(activity_at) AS last_offer_activity
      FROM offer_rows
      GROUP BY customer_id
    )
    SELECT
      customers.id,
      customers.name,
      customers.account_owner AS "accountOwner",
      customers.status,
      customers.main_contact AS "mainContact",
      customers.email,
      customers.phone,
      COALESCE(site_stats.active_sites, '0') AS "activeSites",
      quote_totals.total_quoted_value AS "totalQuotedValue",
      quote_totals.total_accepted_value AS "totalAcceptedValue",
      GREATEST(customers.updated_at, site_stats.last_site_activity, quote_totals.last_offer_activity) AS "lastActivityAt"
    FROM customers
    LEFT JOIN site_stats ON site_stats.customer_id = customers.id
    LEFT JOIN quote_totals ON quote_totals.customer_id = customers.id
    ORDER BY customers.name ASC
  `);

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    accountOwner: row.accountOwner,
    status: row.status,
    mainContact: row.mainContact,
    email: row.email,
    phone: row.phone,
    activeSites: Number(row.activeSites),
    totalQuotedValue: row.totalQuotedValue ?? 0,
    totalAcceptedValue: row.totalAcceptedValue ?? 0,
    lastActivityAt: row.lastActivityAt?.toISOString() ?? null
  }));
}

export async function getCustomerDetail(customerId: string): Promise<CustomerDetail | null> {
  const pool = getDbPool();
  const [customerResult, sitesResult, workPackages] = await Promise.all([
    pool.query<CustomerDetailRow>(
      `
        SELECT
          id,
          name,
          account_owner AS "accountOwner",
          status,
          main_contact AS "mainContact",
          email,
          phone,
          billing_address AS "billingAddress",
          notes
        FROM customers
        WHERE id = $1
      `,
      [customerId]
    ),
    pool.query<SiteListRow>(
      `
        SELECT
          sites.id,
          sites.name,
          sites.customer_id AS "customerId",
          customers.name AS "customerName",
          sites.postcode,
          sites.dno_area AS "dnoArea",
          sites.load_required_kva AS "loadRequiredKva",
          sites.status,
          (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'dno_quote' LIMIT 1) AS "dnoQuoteStatus",
          (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'idno_tender' LIMIT 1) AS "idnoTenderStatus",
          (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'icp_tender' LIMIT 1) AS "icpTenderStatus",
          COALESCE(sites.next_action, 'Review commercial options') AS "nextAction",
          sites.internal_owner AS "internalOwner"
        FROM sites
        LEFT JOIN customers ON customers.id = sites.customer_id
        WHERE sites.customer_id = $1
        ORDER BY sites.name ASC
      `,
      [customerId]
    ),
    getSiteWorkPackages()
  ]);

  const customer = customerResult.rows[0];
  if (!customer) return null;

  return {
    id: customer.id,
    name: customer.name,
    accountOwner: customer.accountOwner,
    status: customer.status,
    mainContact: customer.mainContact,
    email: customer.email,
    phone: customer.phone,
    billingAddress: customer.billingAddress,
    notes: customer.notes,
    sites: sitesResult.rows.map((row) => ({
      ...mapSiteListRow(row),
      workPackages: workPackages.filter((workPackage) => workPackage.siteId === row.id)
    }))
  };
}

export async function getSupplierList(supplierType?: string): Promise<SupplierListItem[]> {
  const pool = getDbPool();
  const params: unknown[] = [];
  const whereClause = supplierType && supplierType !== "All" ? "WHERE suppliers.supplier_type = $1" : "";
  if (whereClause) params.push(supplierType);

  const result = await pool.query<SupplierListRow>(
    `
      WITH supplier_performance AS (
        SELECT
          supplier_id,
          COUNT(*) FILTER (WHERE live_status = TRUE)::text AS live_opportunity_count,
          COUNT(*) FILTER (WHERE accepted = TRUE)::text AS win_count,
          AVG(return_days)::double precision AS average_return_days
        FROM (
          SELECT supplier_id, connection_offer_status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (quote_received_date - application_date)::double precision AS return_days FROM dno_quotes
          UNION ALL
          SELECT supplier_id, status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (tender_return_date - tender_issue_date)::double precision AS return_days FROM idno_tenders
          UNION ALL
          SELECT supplier_id, status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (tender_return_date - tender_issue_date)::double precision AS return_days FROM icp_tenders
        ) supplier_events
        GROUP BY supplier_id
      )
      SELECT
        suppliers.id,
        suppliers.name,
        suppliers.supplier_type AS "supplierType",
        suppliers.region,
        suppliers.framework_status AS "frameworkStatus",
        COALESCE(supplier_performance.live_opportunity_count, '0') AS "liveOpportunityCount",
        COALESCE(supplier_performance.win_count, '0') AS "winCount",
        supplier_performance.average_return_days AS "averageReturnDays"
      FROM suppliers
      LEFT JOIN supplier_performance ON supplier_performance.supplier_id = suppliers.id
      ${whereClause}
      ORDER BY suppliers.name ASC
    `,
    params
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    supplierType: row.supplierType,
    region: row.region,
    frameworkStatus: row.frameworkStatus,
    liveOpportunityCount: Number(row.liveOpportunityCount),
    winCount: Number(row.winCount),
    averageReturnDays: row.averageReturnDays ?? null
  }));
}

export async function getSupplierDetail(supplierId: string): Promise<SupplierDetail | null> {
  const pool = getDbPool();
  const [supplierResult, dnoQuotes, idnoTenders, icpTenders] = await Promise.all([
    pool.query<SupplierDetailRow>(
      `
        WITH supplier_performance AS (
          SELECT
            supplier_id,
            COUNT(*) FILTER (WHERE live_status = TRUE)::text AS live_opportunity_count,
            COUNT(*) FILTER (WHERE accepted = TRUE)::text AS win_count,
            AVG(return_days)::double precision AS average_return_days
          FROM (
            SELECT supplier_id, connection_offer_status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (quote_received_date - application_date)::double precision AS return_days FROM dno_quotes
            UNION ALL
            SELECT supplier_id, status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (tender_return_date - tender_issue_date)::double precision AS return_days FROM idno_tenders
            UNION ALL
            SELECT supplier_id, status IN ('Requested', 'Clarification Needed', 'Under Review') AS live_status, accepted, (tender_return_date - tender_issue_date)::double precision AS return_days FROM icp_tenders
          ) supplier_events
          GROUP BY supplier_id
        )
        SELECT
          suppliers.id,
          suppliers.name,
          suppliers.supplier_type AS "supplierType",
          suppliers.region,
          suppliers.main_contact AS "mainContact",
          suppliers.email,
          suppliers.phone,
          suppliers.address,
          suppliers.framework_status AS "frameworkStatus",
          suppliers.notes,
          COALESCE(supplier_performance.live_opportunity_count, '0') AS "liveOpportunityCount",
          COALESCE(supplier_performance.win_count, '0') AS "winCount",
          supplier_performance.average_return_days AS "averageReturnDays"
        FROM suppliers
        LEFT JOIN supplier_performance ON supplier_performance.supplier_id = suppliers.id
        WHERE suppliers.id = $1
      `,
      [supplierId]
    ),
    getDnoQuotes({ supplierId }),
    getIdnoTenders({ supplierId }),
    getIcpTenders({ supplierId })
  ]);

  const supplier = supplierResult.rows[0];
  if (!supplier) return null;

  return {
    id: supplier.id,
    name: supplier.name,
    supplierType: supplier.supplierType,
    region: supplier.region,
    mainContact: supplier.mainContact,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    frameworkStatus: supplier.frameworkStatus,
    notes: supplier.notes,
    performance: {
      liveOpportunityCount: Number(supplier.liveOpportunityCount),
      winCount: Number(supplier.winCount),
      averageReturnDays: supplier.averageReturnDays ?? null
    },
    dnoQuotes,
    idnoTenders,
    icpTenders
  };
}

export async function getSiteWorkPackages(siteId?: string): Promise<(SiteWorkPackage & { siteId: string })[]> {
  const pool = getDbPool();
  const params: unknown[] = [];
  const whereClause = siteId ? "WHERE site_work_packages.site_id = $1" : "";
  if (siteId) params.push(siteId);

  const result = await pool.query<WorkPackageRow>(
    `
      SELECT
        site_work_packages.id,
        site_work_packages.site_id AS "siteId",
        site_work_packages.package_type AS "packageType",
        site_work_packages.managed_by_type AS "managedByType",
        site_work_packages.managed_by_supplier_id AS "managedBySupplierId",
        suppliers.name AS "managedBySupplierName",
        site_work_packages.status,
        site_work_packages.notes
      FROM site_work_packages
      LEFT JOIN suppliers ON suppliers.id = site_work_packages.managed_by_supplier_id
      ${whereClause}
      ORDER BY site_work_packages.site_id ASC, site_work_packages.package_type ASC
    `,
    params
  );

  return result.rows.map((row) => ({
    id: row.id,
    siteId: row.siteId,
    packageType: row.packageType,
    managedByType: row.managedByType,
    managedBySupplierId: row.managedBySupplierId,
    managedBySupplierName: row.managedBySupplierName,
    status: row.status,
    notes: row.notes
  }));
}

export async function getSiteList(): Promise<SiteListItem[]> {
  const pool = getDbPool();
  const [result, workPackages] = await Promise.all([
    pool.query<SiteListRow>(`
      SELECT
        sites.id,
        sites.name,
        sites.customer_id AS "customerId",
        customers.name AS "customerName",
        sites.postcode,
        sites.dno_area AS "dnoArea",
        sites.load_required_kva AS "loadRequiredKva",
        sites.status,
        (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'dno_quote' LIMIT 1) AS "dnoQuoteStatus",
        (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'idno_tender' LIMIT 1) AS "idnoTenderStatus",
        (SELECT status FROM site_work_packages WHERE site_id = sites.id AND package_type = 'icp_tender' LIMIT 1) AS "icpTenderStatus",
        COALESCE(
          sites.next_action,
          CASE
            WHEN NOT EXISTS (SELECT 1 FROM dno_quotes WHERE site_id = sites.id) THEN 'Request DNO quote'
            WHEN NOT EXISTS (SELECT 1 FROM idno_tenders WHERE site_id = sites.id) THEN 'Issue IDNO tender'
            WHEN NOT EXISTS (SELECT 1 FROM icp_tenders WHERE site_id = sites.id) THEN 'Issue ICP tender'
            ELSE 'Review commercial comparison'
          END
        ) AS "nextAction",
        sites.internal_owner AS "internalOwner"
      FROM sites
      LEFT JOIN customers ON customers.id = sites.customer_id
      ORDER BY sites.updated_at DESC, sites.name ASC
    `),
    getSiteWorkPackages()
  ]);

  return result.rows.map((row) => ({
    ...mapSiteListRow(row),
    workPackages: workPackages.filter((workPackage) => workPackage.siteId === row.id)
  }));
}

export async function getSiteDetail(siteId: string): Promise<SiteDetail | null> {
  const pool = getDbPool();
  const [siteResult, comparisonList, dnoQuotes, idnoTenders, icpTenders, workPackages] = await Promise.all([
    pool.query<SiteDetailRow>(
      `
        SELECT
          sites.id,
          sites.name,
          sites.customer_id AS "customerId",
          customers.name AS "customerName",
          sites.address,
          sites.postcode,
          sites.dno_area AS "dnoArea",
          sites.idno_area AS "idnoArea",
          sites.status,
          sites.voltage_level_sought AS "voltageLevelSought",
          sites.load_required_kva AS "loadRequiredKva",
          sites.export_required_kva AS "exportRequiredKva",
          sites.battery_included AS "batteryIncluded",
          sites.charger_count AS "chargerCount",
          sites.charger_type AS "chargerType",
          sites.target_energisation_date AS "targetEnergisationDate",
          sites.budget,
          sites.internal_owner AS "internalOwner",
          sites.next_action AS "nextAction",
          sites.notes
        FROM sites
        LEFT JOIN customers ON customers.id = sites.customer_id
        WHERE sites.id = $1
      `,
      [siteId]
    ),
    getCommercialComparisonList(),
    getDnoQuotes({ siteId }),
    getIdnoTenders({ siteId }),
    getIcpTenders({ siteId }),
    getSiteWorkPackages(siteId)
  ]);

  const site = siteResult.rows[0];
  if (!site) return null;
  const comparison = comparisonList.find((item) => item.siteId === siteId);

  return {
    id: site.id,
    name: site.name,
    customerId: site.customerId,
    customerName: site.customerName,
    address: site.address,
    postcode: site.postcode,
    dnoArea: site.dnoArea,
    idnoArea: site.idnoArea,
    status: site.status,
    voltageLevelSought: site.voltageLevelSought,
    loadRequiredKva: toNullableNumber(site.loadRequiredKva),
    exportRequiredKva: toNullableNumber(site.exportRequiredKva),
    batteryIncluded: Boolean(site.batteryIncluded),
    chargerCount: site.chargerCount,
    chargerType: site.chargerType,
    targetEnergisationDate: site.targetEnergisationDate?.toISOString() ?? null,
    budget: toNullableNumber(site.budget),
    internalOwner: site.internalOwner,
    nextAction: site.nextAction,
    notes: site.notes,
    workPackages: workPackages.map(stripSiteId),
    comparison: comparison ?? emptyComparison(),
    dnoQuotes,
    idnoTenders,
    icpTenders
  };
}

export async function getDnoQuotes(filters?: { siteId?: string; supplierId?: string }): Promise<DnoQuoteRow[]> {
  const pool = getDbPool();
  const params: unknown[] = [];
  const conditions: string[] = [];
  if (filters?.siteId) {
    params.push(filters.siteId);
    conditions.push(`dno_quotes.site_id = $${params.length}`);
  }
  if (filters?.supplierId) {
    params.push(filters.supplierId);
    conditions.push(`dno_quotes.supplier_id = $${params.length}`);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<DnoQuoteQueryRow>(
    `
      SELECT
        dno_quotes.id,
        sites.id AS "siteId",
        sites.name AS "siteName",
        suppliers.id AS "supplierId",
        suppliers.name AS "supplierName",
        dno_quotes.dno_reference AS "dnoReference",
        dno_quotes.application_date AS "applicationDate",
        dno_quotes.quote_received_date AS "quoteReceivedDate",
        dno_quotes.quote_expiry_date AS "quoteExpiryDate",
        dno_quotes.connection_offer_status AS status,
        dno_quotes.cost_ex_vat AS "costExVat",
        dno_quotes.capacity_offered_kva AS "capacityOfferedKva",
        dno_quotes.delivery_timeframe_days AS "deliveryTimeframeDays",
        dno_quotes.accepted,
        dno_quotes.acceptance_date AS "acceptanceDate",
        (dno_quotes.quote_received_date - dno_quotes.application_date)::double precision AS "daysToReturn",
        (dno_quotes.quote_expiry_date - CURRENT_DATE)::double precision AS "daysToExpiry",
        (dno_quotes.cost_ex_vat - sites.budget)::double precision AS "budgetVariance",
        dno_quotes.notes
      FROM dno_quotes
      INNER JOIN sites ON sites.id = dno_quotes.site_id
      INNER JOIN suppliers ON suppliers.id = dno_quotes.supplier_id
      ${whereClause}
      ORDER BY COALESCE(dno_quotes.quote_expiry_date, dno_quotes.quote_received_date, dno_quotes.application_date) ASC NULLS LAST
    `,
    params
  );

  return result.rows.map((row) => ({
    id: row.id,
    siteId: row.siteId,
    siteName: row.siteName,
    supplierId: row.supplierId,
    supplierName: row.supplierName,
    dnoReference: row.dnoReference,
    applicationDate: toIso(row.applicationDate),
    quoteReceivedDate: toIso(row.quoteReceivedDate),
    quoteExpiryDate: toIso(row.quoteExpiryDate),
    status: row.status,
    costExVat: toNullableNumber(row.costExVat),
    capacityOfferedKva: toNullableNumber(row.capacityOfferedKva),
    deliveryTimeframeDays: toNullableNumber(row.deliveryTimeframeDays),
    accepted: row.accepted,
    acceptanceDate: toIso(row.acceptanceDate),
    daysToReturn: row.daysToReturn,
    daysToExpiry: row.daysToExpiry,
    budgetVariance: toNullableNumber(row.budgetVariance),
    notes: row.notes
  }));
}

export async function getIdnoTenders(filters?: { siteId?: string; supplierId?: string }): Promise<IdnoTenderRow[]> {
  const pool = getDbPool();
  const params: unknown[] = [];
  const conditions: string[] = [];
  if (filters?.siteId) {
    params.push(filters.siteId);
    conditions.push(`idno_tenders.site_id = $${params.length}`);
  }
  if (filters?.supplierId) {
    params.push(filters.supplierId);
    conditions.push(`idno_tenders.supplier_id = $${params.length}`);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<IdnoTenderQueryRow>(
    `
      SELECT
        idno_tenders.id,
        sites.id AS "siteId",
        sites.name AS "siteName",
        suppliers.id AS "supplierId",
        suppliers.name AS "supplierName",
        idno_tenders.tender_issue_date AS "tenderIssueDate",
        idno_tenders.tender_return_date AS "tenderReturnDate",
        idno_tenders.tender_expiry_date AS "tenderExpiryDate",
        idno_tenders.status,
        idno_tenders.gross_adoptable_works_value AS "grossAdoptableWorksValue",
        idno_tenders.asset_value_payment AS "assetValuePayment",
        idno_tenders.non_contestable_cost AS "nonContestableCost",
        idno_tenders.contestable_cost AS "contestableCost",
        (
          COALESCE(idno_tenders.contestable_cost, 0) +
          COALESCE(idno_tenders.non_contestable_cost, 0) -
          COALESCE(idno_tenders.asset_value_payment, 0)
        )::double precision AS "netCostToBusiness",
        idno_tenders.delivery_duration_days AS "deliveryDurationDays",
        idno_tenders.accepted,
        idno_tenders.acceptance_date AS "acceptanceDate",
        (idno_tenders.tender_return_date - idno_tenders.tender_issue_date)::double precision AS "daysToReturn",
        (idno_tenders.tender_expiry_date - CURRENT_DATE)::double precision AS "daysToExpiry",
        idno_tenders.notes
      FROM idno_tenders
      INNER JOIN sites ON sites.id = idno_tenders.site_id
      INNER JOIN suppliers ON suppliers.id = idno_tenders.supplier_id
      ${whereClause}
      ORDER BY COALESCE(idno_tenders.tender_expiry_date, idno_tenders.tender_return_date, idno_tenders.tender_issue_date) ASC NULLS LAST
    `,
    params
  );

  return result.rows.map((row) => ({
    id: row.id,
    siteId: row.siteId,
    siteName: row.siteName,
    supplierId: row.supplierId,
    supplierName: row.supplierName,
    tenderIssueDate: toIso(row.tenderIssueDate),
    tenderReturnDate: toIso(row.tenderReturnDate),
    tenderExpiryDate: toIso(row.tenderExpiryDate),
    status: row.status,
    grossAdoptableWorksValue: toNullableNumber(row.grossAdoptableWorksValue),
    assetValuePayment: toNullableNumber(row.assetValuePayment),
    nonContestableCost: toNullableNumber(row.nonContestableCost),
    contestableCost: toNullableNumber(row.contestableCost),
    netCostToBusiness: toNullableNumber(row.netCostToBusiness),
    deliveryDurationDays: toNullableNumber(row.deliveryDurationDays),
    accepted: row.accepted,
    acceptanceDate: toIso(row.acceptanceDate),
    daysToReturn: row.daysToReturn,
    daysToExpiry: row.daysToExpiry,
    notes: row.notes
  }));
}

export async function getIcpTenders(filters?: { siteId?: string; supplierId?: string }): Promise<IcpTenderRow[]> {
  const pool = getDbPool();
  const params: unknown[] = [];
  const conditions: string[] = [];
  if (filters?.siteId) {
    params.push(filters.siteId);
    conditions.push(`icp_tenders.site_id = $${params.length}`);
  }
  if (filters?.supplierId) {
    params.push(filters.supplierId);
    conditions.push(`icp_tenders.supplier_id = $${params.length}`);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<IcpTenderQueryRow>(
    `
      SELECT
        icp_tenders.id,
        sites.id AS "siteId",
        sites.name AS "siteName",
        suppliers.id AS "supplierId",
        suppliers.name AS "supplierName",
        icp_tenders.tender_issue_date AS "tenderIssueDate",
        icp_tenders.tender_return_date AS "tenderReturnDate",
        icp_tenders.tender_expiry_date AS "tenderExpiryDate",
        icp_tenders.status,
        icp_tenders.contestable_works_cost AS "contestableWorksCost",
        icp_tenders.delivery_duration_days AS "deliveryDurationDays",
        icp_tenders.accepted,
        icp_tenders.acceptance_date AS "acceptanceDate",
        icp_tenders.exclusions,
        icp_tenders.delivery_assumptions AS "deliveryAssumptions",
        (icp_tenders.tender_return_date - icp_tenders.tender_issue_date)::double precision AS "daysToReturn",
        (icp_tenders.tender_expiry_date - CURRENT_DATE)::double precision AS "daysToExpiry",
        icp_tenders.notes
      FROM icp_tenders
      INNER JOIN sites ON sites.id = icp_tenders.site_id
      INNER JOIN suppliers ON suppliers.id = icp_tenders.supplier_id
      ${whereClause}
      ORDER BY COALESCE(icp_tenders.tender_expiry_date, icp_tenders.tender_return_date, icp_tenders.tender_issue_date) ASC NULLS LAST
    `,
    params
  );

  return result.rows.map((row) => ({
    id: row.id,
    siteId: row.siteId,
    siteName: row.siteName,
    supplierId: row.supplierId,
    supplierName: row.supplierName,
    tenderIssueDate: toIso(row.tenderIssueDate),
    tenderReturnDate: toIso(row.tenderReturnDate),
    tenderExpiryDate: toIso(row.tenderExpiryDate),
    status: row.status,
    contestableWorksCost: toNullableNumber(row.contestableWorksCost),
    deliveryDurationDays: toNullableNumber(row.deliveryDurationDays),
    accepted: row.accepted,
    acceptanceDate: toIso(row.acceptanceDate),
    exclusions: row.exclusions,
    deliveryAssumptions: row.deliveryAssumptions,
    daysToReturn: row.daysToReturn,
    daysToExpiry: row.daysToExpiry,
    notes: row.notes
  }));
}

export async function getCommercialComparisonList(): Promise<CommercialComparisonListItem[]> {
  const pool = getDbPool();
  const result = await pool.query<ComparisonRow>(`
    WITH dno_best AS (
      SELECT site_id, MIN(cost_ex_vat)::double precision AS dno_direct_cost
      FROM dno_quotes
      GROUP BY site_id
    ),
    idno_best AS (
      SELECT
        site_id,
        MIN((COALESCE(contestable_cost, 0) + COALESCE(non_contestable_cost, 0) - COALESCE(asset_value_payment, 0))::double precision) AS best_idno_net_cost,
        MIN(delivery_duration_days) AS best_idno_duration,
        MIN((tender_expiry_date - CURRENT_DATE)::double precision) FILTER (WHERE tender_expiry_date IS NOT NULL AND accepted = FALSE) AS idno_expiry_days
      FROM idno_tenders
      GROUP BY site_id
    ),
    icp_best AS (
      SELECT
        site_id,
        MIN(contestable_works_cost)::double precision AS best_icp_cost,
        MIN(delivery_duration_days) AS best_icp_duration,
        MIN((tender_expiry_date - CURRENT_DATE)::double precision) FILTER (WHERE tender_expiry_date IS NOT NULL AND accepted = FALSE) AS icp_expiry_days
      FROM icp_tenders
      GROUP BY site_id
    ),
    dno_timing AS (
      SELECT
        site_id,
        MIN(delivery_timeframe_days) AS best_dno_duration,
        MIN((quote_expiry_date - CURRENT_DATE)::double precision) FILTER (WHERE quote_expiry_date IS NOT NULL AND accepted = FALSE) AS dno_expiry_days
      FROM dno_quotes
      GROUP BY site_id
    )
    SELECT
      sites.id AS "siteId",
      sites.name AS "siteName",
      customers.name AS "customerName",
      sites.budget,
      dno_best.dno_direct_cost AS "dnoDirectCost",
      idno_best.best_idno_net_cost AS "bestIdnoNetCost",
      icp_best.best_icp_cost AS "bestIcpCost",
      LEAST(
        COALESCE(dno_timing.best_dno_duration, 999999),
        COALESCE(idno_best.best_idno_duration, 999999),
        COALESCE(icp_best.best_icp_duration, 999999)
      )::double precision AS "fastestRouteDays",
      LEAST(
        COALESCE(dno_timing.dno_expiry_days, 999999),
        COALESCE(idno_best.idno_expiry_days, 999999),
        COALESCE(icp_best.icp_expiry_days, 999999)
      )::double precision AS "earliestExpiryDays"
    FROM sites
    LEFT JOIN customers ON customers.id = sites.customer_id
    LEFT JOIN dno_best ON dno_best.site_id = sites.id
    LEFT JOIN idno_best ON idno_best.site_id = sites.id
    LEFT JOIN icp_best ON icp_best.site_id = sites.id
    LEFT JOIN dno_timing ON dno_timing.site_id = sites.id
    ORDER BY sites.name ASC
  `);

  return result.rows.map((row) => {
    const dnoDirectCost = toNullableNumber(row.dnoDirectCost);
    const bestIdnoNetCost = toNullableNumber(row.bestIdnoNetCost);
    const bestIcpCost = toNullableNumber(row.bestIcpCost);
    const lowestNetCost = minDefined([dnoDirectCost, bestIdnoNetCost, bestIcpCost]);
    const budget = toNullableNumber(row.budget);

    return {
      siteId: row.siteId,
      siteName: row.siteName,
      customerName: row.customerName,
      budget,
      dnoDirectCost,
      bestIdnoNetCost,
      bestIcpCost,
      lowestNetCost,
      fastestRouteDays: row.fastestRouteDays === 999999 ? null : toNullableNumber(row.fastestRouteDays),
      recommendedRoute: pickRecommendedRoute(dnoDirectCost, bestIdnoNetCost, bestIcpCost),
      budgetVariance: lowestNetCost !== null && budget !== null ? lowestNetCost - budget : null,
      expiryPressure: describeExpiryPressure(row.earliestExpiryDays)
    };
  });
}

function mapSiteListRow(row: SiteListRow): SiteListItem {
  return {
    id: row.id,
    name: row.name,
    customerId: row.customerId,
    customerName: row.customerName,
    postcode: row.postcode,
    dnoArea: row.dnoArea,
    loadRequiredKva: toNullableNumber(row.loadRequiredKva),
    status: row.status,
    dnoQuoteStatus: row.dnoQuoteStatus,
    idnoTenderStatus: row.idnoTenderStatus,
    icpTenderStatus: row.icpTenderStatus,
    nextAction: row.nextAction,
    internalOwner: row.internalOwner,
    workPackages: []
  };
}

function stripSiteId(workPackage: SiteWorkPackage & { siteId: string }): SiteWorkPackage {
  return {
    id: workPackage.id,
    packageType: workPackage.packageType,
    managedByType: workPackage.managedByType,
    managedBySupplierId: workPackage.managedBySupplierId,
    managedBySupplierName: workPackage.managedBySupplierName,
    status: workPackage.status,
    notes: workPackage.notes
  };
}

function emptyComparison(): SiteComparison {
  return {
    dnoDirectCost: null,
    bestIdnoNetCost: null,
    bestIcpCost: null,
    lowestNetCost: null,
    fastestRouteDays: null,
    recommendedRoute: "Awaiting offers",
    budgetVariance: null,
    expiryPressure: "No live expiry"
  };
}

function minDefined(values: Array<number | null>): number | null {
  const definedValues = values.filter((value): value is number => value !== null);
  return definedValues.length > 0 ? Math.min(...definedValues) : null;
}

function pickRecommendedRoute(
  dnoDirectCost: number | null,
  bestIdnoNetCost: number | null,
  bestIcpCost: number | null
): string {
  const candidates = [
    { label: "DNO direct", value: dnoDirectCost },
    { label: "IDNO route", value: bestIdnoNetCost },
    { label: "ICP route", value: bestIcpCost }
  ].filter((candidate): candidate is { label: string; value: number } => candidate.value !== null);

  if (candidates.length === 0) return "Awaiting offers";
  const best = candidates.reduce((current, candidate) => (candidate.value < current.value ? candidate : current));
  return best.label;
}

function describeExpiryPressure(days: number | null): string {
  if (days === null || days === 999999) return "No live expiry";
  if (days < 0) return "Expired";
  if (days <= 7) return "Urgent";
  if (days <= 14) return "Watch closely";
  return "Comfortable";
}

function toIso(value: Date | null): string | null {
  return value ? value.toISOString() : null;
}

function toNullableNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  return typeof value === "number" ? value : Number(value);
}
