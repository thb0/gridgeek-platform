import { saveSiteWorkPackage } from "@/app/actions/org";
import {
  MANAGED_BY_TYPES,
  type SiteWorkPackage,
  type SupplierListItem,
  type WorkPackageType
} from "@/lib/platform-data";

const managedByLabels: Record<(typeof MANAGED_BY_TYPES)[number], string> = {
  internal: "Internal",
  icp: "ICP",
  consultant: "External Consultant",
  external: "External",
  not_required: "Not required"
};

const packageLabels: Record<WorkPackageType, string> = {
  dno_quote: "DNO Quote",
  idno_tender: "IDNO Tender",
  icp_tender: "ICP Tender",
  civil_tender: "Civil Tender"
};

const packageHelp: Record<WorkPackageType, string> = {
  dno_quote: "Keep the commercial package visible even when another party manages DNO interactions.",
  idno_tender: "IDNO tracking should always stay visible because net route cost still matters.",
  icp_tender: "ICP package can represent self-delivered, externally tendered, or not applicable workflows.",
  civil_tender: "Placeholder package so civils responsibility exists from day one."
};

const statusOptions = [
  "Not Started",
  "Requested",
  "Received",
  "Under Review",
  "Clarification Needed",
  "Accepted",
  "Rejected",
  "Expired",
  "Managed by ICP",
  "Not Required"
];

type WorkPackageFormProps = {
  siteId: string;
  workPackage: SiteWorkPackage;
  suppliers: SupplierListItem[];
};

export function WorkPackageForm({ siteId, workPackage, suppliers }: WorkPackageFormProps) {
  return (
    <form action={saveSiteWorkPackage} className="card shadow-sm border-0 h-100">
      <input name="siteId" type="hidden" value={siteId} />
      <input name="workPackageId" type="hidden" value={workPackage.id} />
      <input name="packageType" type="hidden" value={workPackage.packageType} />

      <div className="card-body p-4">
        <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
          <div>
            <h3 className="h5 mb-1">{packageLabels[workPackage.packageType]}</h3>
            <p className="mb-0 small text-body-secondary">{packageHelp[workPackage.packageType]}</p>
          </div>
          <span className="badge text-bg-light text-uppercase">{workPackage.status}</span>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor={`${workPackage.id}-managedByType`}>Managed by</label>
            <select
              className="form-select"
              defaultValue={workPackage.managedByType}
              id={`${workPackage.id}-managedByType`}
              name="managedByType"
            >
              {MANAGED_BY_TYPES.map((value) => (
                <option key={value} value={value}>
                  {managedByLabels[value]}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor={`${workPackage.id}-managedBySupplierId`}>Named supplier</label>
            <select
              className="form-select"
              defaultValue={workPackage.managedBySupplierId ?? ""}
              id={`${workPackage.id}-managedBySupplierId`}
              name="managedBySupplierId"
            >
              <option value="">No named supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} ({supplier.supplierType})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor={`${workPackage.id}-status`}>Status</label>
            <select
              className="form-select"
              defaultValue={workPackage.status}
              id={`${workPackage.id}-status`}
              name="status"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor={`${workPackage.id}-notes`}>Notes</label>
            <textarea
              className="form-control"
              defaultValue={workPackage.notes ?? ""}
              id={`${workPackage.id}-notes`}
              name="notes"
              rows={3}
            />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white border-0 pt-0 px-4 pb-4">
        <button className="btn btn-outline-primary btn-sm" type="submit">Save responsibility</button>
      </div>
    </form>
  );
}
