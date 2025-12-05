export type VisitStatus = "pending" | "confirmed" | "canceled";

export interface Visit {
  id: string;
  itemId: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
  status: VisitStatus;
}

export type CreateVisitInput = Omit<Visit, "id" | "status"> & { status?: VisitStatus };
export type UpdateVisitInput = Partial<CreateVisitInput>;
