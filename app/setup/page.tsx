import { redirect } from "next/navigation";
import { saveOrganizationSetup } from "@/app/actions/org";
import { SetupForm } from "@/components/setup-form";
import { getPrimaryOrganizationProfile } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const organization = await getPrimaryOrganizationProfile().catch(() => null);

  if (!organization) {
    return (
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h1 className="h3 mb-2">Setup unavailable</h1>
          <p className="mb-0 text-body-secondary">An organization record is required before the company setup wizard can run.</p>
        </div>
      </section>
    );
  }

  if (organization.setupCompletedAt) {
    redirect("/dashboard");
  }

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0 grid-hero">
        <div className="card-body p-4 p-lg-5">
          <p className="small text-uppercase fw-semibold text-primary mb-2">First login setup</p>
          <h1 className="display-6 mb-3">Company setup wizard</h1>
          <p className="lead mb-0">
            This short setup flow shapes the app defaults for your business type and how you manage site work packages.
          </p>
        </div>
      </section>

      <SetupForm action={saveOrganizationSetup} organization={organization} submitLabel="Complete setup" />
    </div>
  );
}
