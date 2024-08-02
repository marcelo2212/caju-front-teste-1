import { StatusEnum } from '../types/StatusEnum';

export const listStatusMock = [
  { status: StatusEnum.REVIEW, title: "Pronto para revisar" },
  { status: StatusEnum.APPROVED, title: "Aprovado" },
  { status: StatusEnum.REPROVED, title: "Reprovado" },
];