import { saveOrganizationSettings } from "@/app/actions/org";
import { SetupForm } from "@/components/setup-form";
import { requireOrganizationSetup } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function CompanySettingsPage() {
  const organization = await requireOrganizationSetup();

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <p className="small text-uppercase fw-semibold text-body-secondary mb-2">Settings</p>
          <h1 className="h3 mb-2">Company profile</h1>
          <p className="mb-0 text-body-secondary">
            Edit organization defaults, business type, and delivery model without changing the site-centric data structure.
          </p>
        </div>
      </section>

      <SetupForm action={saveOrganizationSettings} organization={organization} submitLabel="Save company settings" />
    </div>
  );
}
