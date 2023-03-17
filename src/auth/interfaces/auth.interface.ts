import { RoleType } from "../../users/dto/user.dto";

// Interfaz que representará las propiedades del 'Payload' del Token
export interface PayloadToken {
  role: RoleType;
  sub: string;
}