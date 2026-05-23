export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface ContactSuccess {
  ok: true;
  message: string;
}

export interface ContactFailure {
  ok: false;
  message: string;
  errors?: Partial<Record<keyof ContactPayload, string>>;
}

export type ContactResponse = ContactSuccess | ContactFailure;
