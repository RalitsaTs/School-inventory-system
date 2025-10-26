import { Condition, EquipmentStatus } from './enums';

export interface Equipment {
  equipmentId?: number;
  name: string;
  type?: string;
  serialNumber?: string;
  condition: Condition;
  status: EquipmentStatus;
  location?: string;
  photoUrl?: string;
  isSensitive?: boolean;
}

export interface EquipmentSearchParams {
  qtext?: string;
  name?: string;
  type?: string;
  status?: EquipmentStatus;
  condition?: Condition;
}

export interface EquipmentUpdateStatusRequest {
  status: EquipmentStatus;
}