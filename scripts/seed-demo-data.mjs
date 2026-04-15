import process from "node:process";
import pg from "pg";

const { Pool } = pg;

function resolveDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  if (process.env.RUNNING_IN_DOCKER === "true") {
    return databaseUrl;
  }

  const fallbackHost = process.env.DATABASE_HOST_FALLBACK ?? "127.0.0.1";

  try {
    const resolvedUrl = new URL(databaseUrl);
    if (resolvedUrl.hostname === "db") {
      resolvedUrl.hostname = fallbackHost;
    }
    return resolvedUrl.toString();
  } catch {
    return databaseUrl;
  }
}

const seedOrganizationId = "11111111-1111-1111-1111-111111111111";
const seedUserId = "22222222-2222-2222-2222-222222222222";

const workPackages = [
  {
    id: "99999999-9999-9999-9999-999999999991",
    siteId: "55555555-5555-5555-5555-555555555551",
    packageType: "dno_quote",
    managedByType: "internal",
    managedBySupplierId: null,
    status: "Received",
    notes: "Managed directly while commercial comparison is active."
  },
  {
    id: "99999999-9999-9999-9999-999999999992",
    siteId: "55555555-5555-5555-5555-555555555551",
    packageType: "idno_tender",
    managedByType: "internal",
    managedBySupplierId: null,
    status: "Received",
    notes: "Internal team coordinating IDNO tenders."
  },
  {
    id: "99999999-9999-9999-9999-999999999993",
    siteId: "55555555-5555-5555-5555-555555555551",
    packageType: "icp_tender",
    managedByType: "consultant",
    managedBySupplierId: "44444444-4444-4444-4444-444444444444",
    status: "Received",
    notes: "External delivery option being compared."
  },
  {
    id: "99999999-9999-9999-9999-999999999994",
    siteId: "55555555-5555-5555-5555-555555555551",
    packageType: "civil_tender",
    managedByType: "external",
    managedBySupplierId: "44444444-4444-4444-4444-444444444444",
    status: "Requested",
    notes: "Civil scope pending final bill of quantities."
  },
  {
    id: "99999999-9999-9999-9999-999999999995",
    siteId: "55555555-5555-5555-5555-555555555552",
    packageType: "dno_quote",
    managedByType: "icp",
    managedBySupplierId: "44444444-4444-4444-4444-444444444444",
    status: "Under Review",
    notes: "Client asked ICP to manage DNO interactions."
  },
  {
    id: "99999999-9999-9999-9999-999999999996",
    siteId: "55555555-5555-5555-5555-555555555552",
    packageType: "idno_tender",
    managedByType: "icp",
    managedBySupplierId: "44444444-4444-4444-4444-444444444442",
    status: "Under Review",
    notes: "Managed by appointed ICP partner."
  },
  {
    id: "99999999-9999-9999-9999-999999999997",
    siteId: "55555555-5555-5555-5555-555555555552",
    packageType: "icp_tender",
    managedByType: "internal",
    managedBySupplierId: "44444444-4444-4444-4444-444444444445",
    status: "Accepted",
    notes: "External ICP selected."
  },
  {
    id: "99999999-9999-9999-9999-999999999998",
    siteId: "55555555-5555-5555-5555-555555555552",
    packageType: "civil_tender",
    managedByType: "internal",
    managedBySupplierId: null,
    status: "Not Started",
    notes: "Client-side civils decision pending."
  },
  {
    id: "99999999-9999-9999-9999-999999999999",
    siteId: "55555555-5555-5555-5555-555555555553",
    packageType: "dno_quote",
    managedByType: "internal",
    managedBySupplierId: null,
    status: "Requested",
    notes: "Application pack in progress."
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    siteId: "55555555-5555-5555-5555-555555555553",
    packageType: "idno_tender",
    managedByType: "not_required",
    managedBySupplierId: null,
    status: "Not Required",
    notes: "No IDNO route needed at current stage."
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
    siteId: "55555555-5555-5555-5555-555555555553",
    packageType: "icp_tender",
    managedByType: "consultant",
    managedBySupplierId: null,
    status: "Not Started",
    notes: "Awaiting delivery strategy decision."
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3",
    siteId: "55555555-5555-5555-5555-555555555553",
    packageType: "civil_tender",
    managedByType: "external",
    managedBySupplierId: null,
    status: "Not Started",
    notes: "Placeholder for later civils scope."
  }
];

const customers = [
  {
    id: "33333333-3333-3333-3333-333333333331",
    name: "North Ridge Estates",
    status: "Active",
    customerType: "developer",
    accountOwner: "Sam Carter",
    mainContact: "Olivia Marsh",
    email: "olivia@nr-estates.example",
    phone: "0207 555 0101",
    billingAddress: "1 Crown Yard, London, EC4",
    notes: "Mixed-use developer with repeat EV and battery opportunities."
  },
  {
    id: "33333333-3333-3333-3333-333333333332",
    name: "Harbour Retail Group",
    status: "Active",
    customerType: "commercial",
    accountOwner: "Nadia Price",
    mainContact: "Chris Bolton",
    email: "cbolton@harbour-retail.example",
    phone: "0161 555 0102",
    billingAddress: "Harbour House, Salford, M50",
    notes: "Programme driven. Sensitive to energisation dates."
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "East Vale Housing",
    status: "Data Gathering",
    customerType: "housing",
    accountOwner: "Sam Carter",
    mainContact: "Laura Kent",
    email: "laura.kent@eastvale.example",
    phone: "0113 555 0103",
    billingAddress: "5 Riverside Court, Leeds, LS1",
    notes: "Housing rollout with phased meters and heat pump capacity increases."
  }
];

const suppliers = [
  {
    id: "44444444-4444-4444-4444-444444444441",
    name: "Northern Power Grid",
    status: "Active",
    supplierType: "DNO",
    region: "North East / Yorkshire",
    mainContact: "Jamie Ellis",
    email: "connections@npg.example",
    phone: "0191 555 2001",
    address: "Penshaw House, Durham",
    frameworkStatus: "Preferred",
    notes: "Fastest responder on recent multi-unit jobs."
  },
  {
    id: "44444444-4444-4444-4444-444444444442",
    name: "GTC",
    status: "Active",
    supplierType: "IDNO",
    region: "National",
    mainContact: "Priya Shah",
    email: "commercial@gtc.example",
    phone: "0207 555 2002",
    address: "London Office",
    frameworkStatus: "On Framework",
    notes: "Strong asset values on larger adoption packages."
  },
  {
    id: "44444444-4444-4444-4444-444444444443",
    name: "Energi Networks",
    status: "Active",
    supplierType: "IDNO",
    region: "Midlands / South",
    mainContact: "Alex Morgan",
    email: "tenders@energi.example",
    phone: "0121 555 2003",
    address: "Birmingham Office",
    frameworkStatus: "Approved",
    notes: "Competitive on mixed contestable/non-contestable structures."
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "SiteSpark Civils",
    status: "Active",
    supplierType: "ICP",
    region: "National",
    mainContact: "Ben Turner",
    email: "estimating@sitespark.example",
    phone: "0170 555 2004",
    address: "Manchester Office",
    frameworkStatus: "Preferred",
    notes: "Reliable programme delivery for charger-heavy sites."
  },
  {
    id: "44444444-4444-4444-4444-444444444445",
    name: "Voltline Projects",
    status: "Active",
    supplierType: "ICP",
    region: "South East",
    mainContact: "Mia Evans",
    email: "bids@voltline.example",
    phone: "0148 555 2005",
    address: "Reading Office",
    frameworkStatus: "Approved",
    notes: "Sharper pricing where trenching scope is limited."
  }
];

const sites = [
  {
    id: "55555555-5555-5555-5555-555555555551",
    customerId: customers[0].id,
    name: "Ridge Farm Solar Park",
    status: "Quotes Pending",
    siteType: "generation",
    address: "Ridge Farm Lane, Harrogate",
    postcode: "HG3 2AB",
    dnoArea: "Northern Powergrid",
    idnoArea: "Yorkshire",
    voltageLevelSought: "HV",
    loadRequiredKva: 1800,
    exportRequiredKva: 1200,
    batteryIncluded: true,
    chargerCount: 12,
    chargerType: "DC rapid",
    targetEnergisationDate: "2026-10-01",
    budget: 460000,
    internalOwner: "Nadia Price",
    nextAction: "Review IDNO asset value positions once all returns land",
    notes: "Solar export and battery import profile make route comparison commercially sensitive."
  },
  {
    id: "55555555-5555-5555-5555-555555555552",
    customerId: customers[1].id,
    name: "Harbour Point Retail Units",
    status: "Under Review",
    siteType: "commercial",
    address: "Harbour Point, Salford Quays",
    postcode: "M50 3UB",
    dnoArea: "Electricity North West",
    idnoArea: "North West",
    voltageLevelSought: "LV",
    loadRequiredKva: 650,
    exportRequiredKva: 0,
    batteryIncluded: false,
    chargerCount: 24,
    chargerType: "AC destination",
    targetEnergisationDate: "2026-08-15",
    budget: 220000,
    internalOwner: "Sam Carter",
    nextAction: "Choose preferred route before DNO expiry",
    notes: "Retail tenant go-live date is fixed."
  },
  {
    id: "55555555-5555-5555-5555-555555555553",
    customerId: customers[2].id,
    name: "East Vale Phase 2",
    status: "Data Gathering",
    siteType: "residential",
    address: "East Vale Avenue, Leeds",
    postcode: "LS14 6PQ",
    dnoArea: "Northern Powergrid",
    idnoArea: "Yorkshire",
    voltageLevelSought: "LV",
    loadRequiredKva: 420,
    exportRequiredKva: 80,
    batteryIncluded: false,
    chargerCount: 8,
    chargerType: "AC fast",
    targetEnergisationDate: "2027-01-20",
    budget: 145000,
    internalOwner: "Nadia Price",
    nextAction: "Submit DNO application pack",
    notes: "Phase 1 already built. Need consistent route decision rationale."
  }
];

const dnoQuotes = [
  {
    id: "66666666-6666-6666-6666-666666666661",
    siteId: sites[0].id,
    supplierId: suppliers[0].id,
    dnoReference: "NPG-2026-001",
    applicationDate: "2026-03-03",
    quoteReceivedDate: "2026-03-28",
    quoteExpiryDate: "2026-04-24",
    connectionOfferStatus: "Received",
    pointOfConnectionSummary: "11kV tee-off from adjacent feeder",
    capacityOfferedKva: 1800,
    costExVat: 410000,
    reinforcementCost: 125000,
    contestableAmount: 90000,
    nonContestableAmount: 320000,
    deliveryTimeframeDays: 150,
    accepted: false,
    acceptanceDate: null,
    notes: "Reinforcement driven. Capacity available with feeder works."
  },
  {
    id: "66666666-6666-6666-6666-666666666662",
    siteId: sites[1].id,
    supplierId: suppliers[0].id,
    dnoReference: "ENW-2026-017",
    applicationDate: "2026-02-12",
    quoteReceivedDate: "2026-03-01",
    quoteExpiryDate: "2026-04-20",
    connectionOfferStatus: "Under Review",
    pointOfConnectionSummary: "LV joint bay and new feeder pillar",
    capacityOfferedKva: 650,
    costExVat: 198000,
    reinforcementCost: 45000,
    contestableAmount: 35000,
    nonContestableAmount: 163000,
    deliveryTimeframeDays: 90,
    accepted: false,
    acceptanceDate: null,
    notes: "Requires wayleave confirmation."
  },
  {
    id: "66666666-6666-6666-6666-666666666663",
    siteId: sites[2].id,
    supplierId: suppliers[0].id,
    dnoReference: "NPG-2026-034",
    applicationDate: "2026-04-08",
    quoteReceivedDate: null,
    quoteExpiryDate: null,
    connectionOfferStatus: "Requested",
    pointOfConnectionSummary: null,
    capacityOfferedKva: null,
    costExVat: null,
    reinforcementCost: null,
    contestableAmount: null,
    nonContestableAmount: null,
    deliveryTimeframeDays: null,
    accepted: false,
    acceptanceDate: null,
    notes: "Application in progress."
  }
];

const idnoTenders = [
  {
    id: "77777777-7777-7777-7777-777777777771",
    siteId: sites[0].id,
    supplierId: suppliers[1].id,
    tenderIssueDate: "2026-03-10",
    tenderReturnDate: "2026-03-26",
    tenderExpiryDate: "2026-04-22",
    status: "Received",
    grossAdoptableWorksValue: 360000,
    assetValuePayment: 145000,
    nonContestableCost: 110000,
    contestableCost: 160000,
    deliveryDurationDays: 120,
    adoptionAssumptions: "Standard easement package and final adoption",
    programmeAssumptions: "12-week mobilisation after acceptance",
    accepted: false,
    acceptanceDate: null,
    notes: "Very strong asset value."
  },
  {
    id: "77777777-7777-7777-7777-777777777772",
    siteId: sites[0].id,
    supplierId: suppliers[2].id,
    tenderIssueDate: "2026-03-10",
    tenderReturnDate: "2026-03-29",
    tenderExpiryDate: "2026-04-25",
    status: "Received",
    grossAdoptableWorksValue: 350000,
    assetValuePayment: 120000,
    nonContestableCost: 118000,
    contestableCost: 154000,
    deliveryDurationDays: 112,
    adoptionAssumptions: "Standard easement package",
    programmeAssumptions: "10-week mobilisation after acceptance",
    accepted: false,
    acceptanceDate: null,
    notes: "Best programme duration of the IDNO returns."
  },
  {
    id: "77777777-7777-7777-7777-777777777773",
    siteId: sites[1].id,
    supplierId: suppliers[1].id,
    tenderIssueDate: "2026-03-04",
    tenderReturnDate: "2026-03-18",
    tenderExpiryDate: "2026-04-19",
    status: "Under Review",
    grossAdoptableWorksValue: 170000,
    assetValuePayment: 52000,
    nonContestableCost: 65000,
    contestableCost: 98000,
    deliveryDurationDays: 70,
    adoptionAssumptions: "Retail curtilage legal pack outstanding",
    programmeAssumptions: "Can align with tenant fit-out",
    accepted: false,
    acceptanceDate: null,
    notes: "Commercially strongest net route so far."
  }
];

const icpTenders = [
  {
    id: "88888888-8888-8888-8888-888888888881",
    siteId: sites[0].id,
    supplierId: suppliers[3].id,
    tenderIssueDate: "2026-03-10",
    tenderReturnDate: "2026-03-24",
    tenderExpiryDate: "2026-04-21",
    status: "Received",
    contestableWorksCost: 172000,
    exclusions: "Wayleaves and final meter procurement excluded",
    deliveryDurationDays: 98,
    deliveryAssumptions: "Civils by ICP direct labour",
    accepted: false,
    acceptanceDate: null,
    notes: "Fastest contestable build option."
  },
  {
    id: "88888888-8888-8888-8888-888888888882",
    siteId: sites[1].id,
    supplierId: suppliers[4].id,
    tenderIssueDate: "2026-03-04",
    tenderReturnDate: "2026-03-16",
    tenderExpiryDate: "2026-04-18",
    status: "Received",
    contestableWorksCost: 108000,
    exclusions: "Metering and duct diversions excluded",
    deliveryDurationDays: 63,
    deliveryAssumptions: "Customer civils interface needed",
    accepted: true,
    acceptanceDate: "2026-04-02",
    notes: "Accepted subject to final legal pack."
  }
];

async function seedDemoData() {
  const pool = new Pool({ connectionString: resolveDatabaseUrl() });
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        INSERT INTO organizations (id, name, status)
        VALUES ($1, $2, 'active')
        ON CONFLICT (id) DO UPDATE
        SET
          name = EXCLUDED.name,
          status = EXCLUDED.status
      `,
      [seedOrganizationId, "GridGeek Demo Org"]
    );

    await client.query(
      `
        UPDATE organizations
        SET
          company_address = $2,
          contact_name = $3,
          contact_email = $4,
          contact_phone = $5,
          business_type = $6,
          default_delivery_model = $7,
          setup_completed_at = NOW()
        WHERE id = $1
      `,
      [
        seedOrganizationId,
        "GridGeek House, Leeds, LS1 4AA",
        "GridGeek Operations",
        "ops@gridgeek.local",
        "0113 555 0000",
        "Solar",
        "appoint_icp_for_some_packages"
      ]
    );

    await client.query(
      `
        INSERT INTO users (id, email, display_name, status)
        VALUES ($1, $2, $3, 'active')
        ON CONFLICT (id) DO UPDATE
        SET email = EXCLUDED.email, display_name = EXCLUDED.display_name, status = EXCLUDED.status
      `,
      [seedUserId, "ops@gridgeek.local", "GridGeek Operator"]
    );

    await client.query(
      `
        INSERT INTO memberships (organization_id, user_id, role, status)
        VALUES ($1, $2, 'owner', 'active')
        ON CONFLICT (organization_id, user_id) DO UPDATE
        SET role = EXCLUDED.role, status = EXCLUDED.status
      `,
      [seedOrganizationId, seedUserId]
    );

    for (const customer of customers) {
      await client.query(
        `
          INSERT INTO customers (
            id,
            organization_id,
            name,
            status,
            customer_type,
            account_owner,
            main_contact,
            email,
            phone,
            billing_address,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE
          SET
            name = EXCLUDED.name,
            status = EXCLUDED.status,
            customer_type = EXCLUDED.customer_type,
            account_owner = EXCLUDED.account_owner,
            main_contact = EXCLUDED.main_contact,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            billing_address = EXCLUDED.billing_address,
            notes = EXCLUDED.notes
        `,
        [
          customer.id,
          seedOrganizationId,
          customer.name,
          customer.status,
          customer.customerType,
          customer.accountOwner,
          customer.mainContact,
          customer.email,
          customer.phone,
          customer.billingAddress,
          customer.notes
        ]
      );
    }

    for (const supplier of suppliers) {
      await client.query(
        `
          INSERT INTO suppliers (
            id,
            organization_id,
            name,
            status,
            supplier_type,
            region,
            main_contact,
            email,
            phone,
            address,
            framework_status,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (id) DO UPDATE
          SET
            name = EXCLUDED.name,
            status = EXCLUDED.status,
            supplier_type = EXCLUDED.supplier_type,
            region = EXCLUDED.region,
            main_contact = EXCLUDED.main_contact,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            address = EXCLUDED.address,
            framework_status = EXCLUDED.framework_status,
            notes = EXCLUDED.notes
        `,
        [
          supplier.id,
          seedOrganizationId,
          supplier.name,
          supplier.status,
          supplier.supplierType,
          supplier.region,
          supplier.mainContact,
          supplier.email,
          supplier.phone,
          supplier.address,
          supplier.frameworkStatus,
          supplier.notes
        ]
      );
    }

    for (const site of sites) {
      await client.query(
        `
          INSERT INTO sites (
            id,
            organization_id,
            customer_id,
            name,
            status,
            site_type,
            address,
            postcode,
            dno_area,
            idno_area,
            voltage_level_sought,
            load_required_kva,
            export_required_kva,
            battery_included,
            charger_count,
            charger_type,
            target_energisation_date,
            budget,
            internal_owner,
            next_action,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          ON CONFLICT (id) DO UPDATE
          SET
            customer_id = EXCLUDED.customer_id,
            name = EXCLUDED.name,
            status = EXCLUDED.status,
            site_type = EXCLUDED.site_type,
            address = EXCLUDED.address,
            postcode = EXCLUDED.postcode,
            dno_area = EXCLUDED.dno_area,
            idno_area = EXCLUDED.idno_area,
            voltage_level_sought = EXCLUDED.voltage_level_sought,
            load_required_kva = EXCLUDED.load_required_kva,
            export_required_kva = EXCLUDED.export_required_kva,
            battery_included = EXCLUDED.battery_included,
            charger_count = EXCLUDED.charger_count,
            charger_type = EXCLUDED.charger_type,
            target_energisation_date = EXCLUDED.target_energisation_date,
            budget = EXCLUDED.budget,
            internal_owner = EXCLUDED.internal_owner,
            next_action = EXCLUDED.next_action,
            notes = EXCLUDED.notes
        `,
        [
          site.id,
          seedOrganizationId,
          site.customerId,
          site.name,
          site.status,
          site.siteType,
          site.address,
          site.postcode,
          site.dnoArea,
          site.idnoArea,
          site.voltageLevelSought,
          site.loadRequiredKva,
          site.exportRequiredKva,
          site.batteryIncluded,
          site.chargerCount,
          site.chargerType,
          site.targetEnergisationDate,
          site.budget,
          site.internalOwner,
          site.nextAction,
          site.notes
        ]
      );
    }

    for (const quote of dnoQuotes) {
      await client.query(
        `
          INSERT INTO dno_quotes (
            id,
            site_id,
            supplier_id,
            dno_reference,
            application_date,
            quote_received_date,
            quote_expiry_date,
            connection_offer_status,
            point_of_connection_summary,
            capacity_offered_kva,
            cost_ex_vat,
            reinforcement_cost,
            contestable_amount,
            non_contestable_amount,
            delivery_timeframe_days,
            accepted,
            acceptance_date,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (id) DO UPDATE
          SET
            supplier_id = EXCLUDED.supplier_id,
            dno_reference = EXCLUDED.dno_reference,
            application_date = EXCLUDED.application_date,
            quote_received_date = EXCLUDED.quote_received_date,
            quote_expiry_date = EXCLUDED.quote_expiry_date,
            connection_offer_status = EXCLUDED.connection_offer_status,
            point_of_connection_summary = EXCLUDED.point_of_connection_summary,
            capacity_offered_kva = EXCLUDED.capacity_offered_kva,
            cost_ex_vat = EXCLUDED.cost_ex_vat,
            reinforcement_cost = EXCLUDED.reinforcement_cost,
            contestable_amount = EXCLUDED.contestable_amount,
            non_contestable_amount = EXCLUDED.non_contestable_amount,
            delivery_timeframe_days = EXCLUDED.delivery_timeframe_days,
            accepted = EXCLUDED.accepted,
            acceptance_date = EXCLUDED.acceptance_date,
            notes = EXCLUDED.notes
        `,
        [
          quote.id,
          quote.siteId,
          quote.supplierId,
          quote.dnoReference,
          quote.applicationDate,
          quote.quoteReceivedDate,
          quote.quoteExpiryDate,
          quote.connectionOfferStatus,
          quote.pointOfConnectionSummary,
          quote.capacityOfferedKva,
          quote.costExVat,
          quote.reinforcementCost,
          quote.contestableAmount,
          quote.nonContestableAmount,
          quote.deliveryTimeframeDays,
          quote.accepted,
          quote.acceptanceDate,
          quote.notes
        ]
      );
    }

    for (const tender of idnoTenders) {
      await client.query(
        `
          INSERT INTO idno_tenders (
            id,
            site_id,
            supplier_id,
            tender_issue_date,
            tender_return_date,
            tender_expiry_date,
            status,
            gross_adoptable_works_value,
            asset_value_payment,
            non_contestable_cost,
            contestable_cost,
            delivery_duration_days,
            adoption_assumptions,
            programme_assumptions,
            accepted,
            acceptance_date,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (id) DO UPDATE
          SET
            supplier_id = EXCLUDED.supplier_id,
            tender_issue_date = EXCLUDED.tender_issue_date,
            tender_return_date = EXCLUDED.tender_return_date,
            tender_expiry_date = EXCLUDED.tender_expiry_date,
            status = EXCLUDED.status,
            gross_adoptable_works_value = EXCLUDED.gross_adoptable_works_value,
            asset_value_payment = EXCLUDED.asset_value_payment,
            non_contestable_cost = EXCLUDED.non_contestable_cost,
            contestable_cost = EXCLUDED.contestable_cost,
            delivery_duration_days = EXCLUDED.delivery_duration_days,
            adoption_assumptions = EXCLUDED.adoption_assumptions,
            programme_assumptions = EXCLUDED.programme_assumptions,
            accepted = EXCLUDED.accepted,
            acceptance_date = EXCLUDED.acceptance_date,
            notes = EXCLUDED.notes
        `,
        [
          tender.id,
          tender.siteId,
          tender.supplierId,
          tender.tenderIssueDate,
          tender.tenderReturnDate,
          tender.tenderExpiryDate,
          tender.status,
          tender.grossAdoptableWorksValue,
          tender.assetValuePayment,
          tender.nonContestableCost,
          tender.contestableCost,
          tender.deliveryDurationDays,
          tender.adoptionAssumptions,
          tender.programmeAssumptions,
          tender.accepted,
          tender.acceptanceDate,
          tender.notes
        ]
      );
    }

    for (const tender of icpTenders) {
      await client.query(
        `
          INSERT INTO icp_tenders (
            id,
            site_id,
            supplier_id,
            tender_issue_date,
            tender_return_date,
            tender_expiry_date,
            status,
            contestable_works_cost,
            exclusions,
            delivery_duration_days,
            delivery_assumptions,
            accepted,
            acceptance_date,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE
          SET
            supplier_id = EXCLUDED.supplier_id,
            tender_issue_date = EXCLUDED.tender_issue_date,
            tender_return_date = EXCLUDED.tender_return_date,
            tender_expiry_date = EXCLUDED.tender_expiry_date,
            status = EXCLUDED.status,
            contestable_works_cost = EXCLUDED.contestable_works_cost,
            exclusions = EXCLUDED.exclusions,
            delivery_duration_days = EXCLUDED.delivery_duration_days,
            delivery_assumptions = EXCLUDED.delivery_assumptions,
            accepted = EXCLUDED.accepted,
            acceptance_date = EXCLUDED.acceptance_date,
            notes = EXCLUDED.notes
        `,
        [
          tender.id,
          tender.siteId,
          tender.supplierId,
          tender.tenderIssueDate,
          tender.tenderReturnDate,
          tender.tenderExpiryDate,
          tender.status,
          tender.contestableWorksCost,
          tender.exclusions,
          tender.deliveryDurationDays,
          tender.deliveryAssumptions,
          tender.accepted,
          tender.acceptanceDate,
          tender.notes
        ]
      );
    }

    for (const workPackage of workPackages) {
      await client.query(
        `
          INSERT INTO site_work_packages (
            id,
            site_id,
            package_type,
            managed_by_type,
            managed_by_supplier_id,
            status,
            notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (site_id, package_type) DO UPDATE
          SET
            managed_by_type = EXCLUDED.managed_by_type,
            managed_by_supplier_id = EXCLUDED.managed_by_supplier_id,
            status = EXCLUDED.status,
            notes = EXCLUDED.notes
        `,
        [
          workPackage.id,
          workPackage.siteId,
          workPackage.packageType,
          workPackage.managedByType,
          workPackage.managedBySupplierId,
          workPackage.status,
          workPackage.notes
        ]
      );
    }

    await client.query("COMMIT");
    console.log("Demo data seeded.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to seed demo data.");
    console.error(error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDemoData();
