import { BUSINESS_TYPES, DELIVERY_MODELS, type OrganizationProfile } from "@/lib/platform-data";

type SetupFormProps = {
  organization: OrganizationProfile;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

const deliveryModelLabels: Record<(typeof DELIVERY_MODELS)[number], string> = {
  manage_all_packages: "We manage all packages",
  appoint_icp_for_some_packages: "We often appoint an ICP to manage some packages",
  act_as_icp_for_clients: "We are the ICP delivering packages for clients"
};

export function SetupForm({ organization, action, submitLabel }: SetupFormProps) {
  return (
    <form action={action} className="d-grid gap-4">
      <input name="organizationId" type="hidden" value={organization.id} />

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Company details</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="companyName">Company name</label>
              <input className="form-control" defaultValue={organization.name} id="companyName" name="companyName" required />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="contactName">Main contact name</label>
              <input className="form-control" defaultValue={organization.contactName ?? ""} id="contactName" name="contactName" />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="companyAddress">Company address</label>
              <textarea className="form-control" defaultValue={organization.companyAddress ?? ""} id="companyAddress" name="companyAddress" rows={3} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="contactEmail">Main contact email</label>
              <input className="form-control" defaultValue={organization.contactEmail ?? ""} id="contactEmail" name="contactEmail" type="email" />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="contactPhone">Main contact phone</label>
              <input className="form-control" defaultValue={organization.contactPhone ?? ""} id="contactPhone" name="contactPhone" />
            </div>
          </div>
        </div>
      </section>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Business type</h2>
          <div className="row g-3">
            {BUSINESS_TYPES.map((businessType) => (
              <div className="col-md-3" key={businessType}>
                <label className="card border-1 h-100 p-3">
                  <input
                    className="form-check-input mb-3"
                    defaultChecked={organization.businessType === businessType}
                    name="businessType"
                    required
                    type="radio"
                    value={businessType}
                  />
                  <span className="fw-semibold d-block">{businessType}</span>
                  <span className="small text-body-secondary">
                    {businessType === "ICP" ? "We deliver packages for clients." : "We track sites while coordinating delivery partners."}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Default delivery model</h2>
          <div className="d-grid gap-3">
            {DELIVERY_MODELS.map((deliveryModel) => (
              <label className="card border-1 p-3" key={deliveryModel}>
                <input
                  className="form-check-input me-2"
                  defaultChecked={organization.defaultDeliveryModel === deliveryModel}
                  name="defaultDeliveryModel"
                  required
                  type="radio"
                  value={deliveryModel}
                />
                <span className="fw-semibold">{deliveryModelLabels[deliveryModel]}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Coming next</h2>
          <p className="mb-1 text-body-secondary">Logo upload, regional defaults, and quote assumptions can sit here later without changing the core model.</p>
          <button className="btn btn-primary" type="submit">{submitLabel}</button>
        </div>
      </section>
    </form>
  );
}
