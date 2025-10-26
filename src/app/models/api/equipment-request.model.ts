import { Equipment } from './equipment.model';
import { RequestStatus, Condition, EquipmentStatus } from './enums';

export interface EquipmentRequest {
  id?: number;
  equipmentId: number;
  equipment?: Equipment;
  requesterId?: string;
  requestedAt?: Date;
  start?: Date;
  end?: Date;
  status?: RequestStatus;
  approvedById?: string;
  approvedAt?: Date;
  notes?: string;
  returnedAt?: Date;
  returnNotes?: string;
}

export interface CreateEquipmentRequest {
  equipmentId: number;
  start: Date;
  end: Date;
  notes?: string;
}

export interface ReturnRequest {
  condition?: Condition;
  status?: EquipmentStatus;
  notes?: string;
}

export interface RejectRequest {
  notes?: string;
}