export interface Debt {
  id: string;
  name: string;
  phone?: string;
  amount: number;
  type: 'owed_to_me' | 'owed_by_me'; // owed_to_me = أقرضته، owed_by_me = اقترضت منه
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
}
