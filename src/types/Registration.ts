import { StatusEnum } from "./StatusEnum";

export interface Registration {
    id?: string;
    employeeName: string;
    email: string;
    cpf: string;
    admissionDate: string;
    status: StatusEnum;
  }