export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export type ContactField = keyof ContactPayload;
