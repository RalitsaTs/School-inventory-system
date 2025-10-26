import { AppUser } from './user.model';

export interface InventoryDocument {
  id?: number;
  title: string;
  path: string;
  visibilityRole: string;
  uploadedById: string;
  uploadedBy?: AppUser;
  uploadedAt?: Date;
}

export interface CreateDocumentRequest {
  title: string;
  path: string;
  visibilityRole: string;
}

export interface UpdateDocumentRequest {
  title: string;
  path: string;
  visibilityRole: string;
}