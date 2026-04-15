"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDbPool } from "@/lib/db";
import {
  BUSINESS_TYPES,
  DELIVERY_MODELS,
  MANAGED_BY_TYPES,
  WORK_PACKAGE_TYPES,
  type BusinessType,
  type DeliveryModel,
  type ManagedByType,
  type WorkPackageType
} from "@/lib/platform-data";

export async function saveOrganizationSetup(formData: FormData) {
  const pool = getDbPool();
  const organizationId = readRequiredString(formData, "organizationId");
  const companyName = readRequiredString(formData, "companyName");
  const companyAddress = readOptionalString(formData, "companyAddress");
  const contactName = readOptionalString(formData, "contactName");
  const contactEmail = readOptionalString(formData, "contactEmail");
  const contactPhone = readOptionalString(formData, "contactPhone");
  const businessType = readEnum(formData, "businessType", BUSINESS_TYPES);
  const defaultDeliveryModel = readEnum(formData, "defaultDeliveryModel", DELIVERY_MODELS);

  await pool.query(
    `
      UPDATE organizations
      SET
        name = $2,
        company_address = $3,
        contact_name = $4,
        contact_email = $5,
        contact_phone = $6,
        business_type = $7,
        default_delivery_model = $8,
        setup_completed_at = NOW()
      WHERE id = $1
    `,
    [
      organizationId,
      companyName,
      companyAddress,
      contactName,
      contactEmail,
      contactPhone,
      businessType,
      defaultDeliveryModel
    ]
  );

  revalidatePath("/");
  revalidatePath("/setup");
  revalidatePath("/settings/company");
  redirect("/dashboard");
}

export async function saveOrganizationSettings(formData: FormData) {
  const pool = getDbPool();
  const organizationId = readRequiredString(formData, "organizationId");
  const companyName = readRequiredString(formData, "companyName");
  const companyAddress = readOptionalString(formData, "companyAddress");
  const contactName = readOptionalString(formData, "contactName");
  const contactEmail = readOptionalString(formData, "contactEmail");
  const contactPhone = readOptionalString(formData, "contactPhone");
  const businessType = readEnum(formData, "businessType", BUSINESS_TYPES);
  const defaultDeliveryModel = readEnum(formData, "defaultDeliveryModel", DELIVERY_MODELS);

  await pool.query(
    `
      UPDATE organizations
      SET
        name = $2,
        company_address = $3,
        contact_name = $4,
        contact_email = $5,
        contact_phone = $6,
        business_type = $7,
        default_delivery_model = $8
      WHERE id = $1
    `,
    [
      organizationId,
      companyName,
      companyAddress,
      contactName,
      contactEmail,
      contactPhone,
      businessType,
      defaultDeliveryModel
    ]
  );

  revalidatePath("/settings/company");
  revalidatePath("/dashboard");
  revalidatePath("/sites");
}

export async function saveSiteWorkPackage(formData: FormData) {
  const pool = getDbPool();
  const workPackageId = readRequiredString(formData, "workPackageId");
  const siteId = readRequiredString(formData, "siteId");
  const packageType = readEnum(formData, "packageType", WORK_PACKAGE_TYPES);
  const managedByType = readEnum(formData, "managedByType", MANAGED_BY_TYPES);
  const managedBySupplierId = readOptionalString(formData, "managedBySupplierId");
  const status = readRequiredString(formData, "status");
  const notes = readOptionalString(formData, "notes");

  await pool.query(
    `
      UPDATE site_work_packages
      SET
        managed_by_type = $2,
        managed_by_supplier_id = $3,
        status = $4,
        notes = $5
      WHERE id = $1
    `,
    [
      workPackageId,
      managedByType,
      managedBySupplierId || null,
      status,
      notes
    ]
  );

  revalidatePath(`/sites/${siteId}`);
  revalidatePath("/sites");
  revalidatePath("/dashboard");
  revalidatePath("/comparison");
  revalidatePath(packagePathFor(packageType));
}

function packagePathFor(packageType: WorkPackageType) {
  switch (packageType) {
    case "dno_quote":
      return "/quotes/dno";
    case "idno_tender":
      return "/tenders/idno";
    case "icp_tender":
      return "/tenders/icp";
    case "civil_tender":
      return "/sites";
  }
}

function readRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} is required.`);
  }
  return value.trim();
}

function readOptionalString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function readEnum<T extends readonly string[]>(formData: FormData, field: string, values: T): T[number] {
  const value = readRequiredString(formData, field);
  if (!values.includes(value)) {
    throw new Error(`${field} is invalid.`);
  }
  return value as T[number];
}
