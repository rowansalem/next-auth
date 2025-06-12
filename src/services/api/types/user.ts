import { FileEntity } from "./file-entity";
import { Role } from "./role";

export type User = {
  id: number | string;
  email: string;
  firstName?: string;
  lastName?: string;
  photo?: FileEntity;
  role?: Role;
};

