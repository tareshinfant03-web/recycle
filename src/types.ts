export type Category = {
  id: string;
  name: string;
  unit: string;
  active: boolean;
};

export type PriceReference = {
  id: string;
  category: string;
  rate: number;
  source: string;
  updatedAt: string;
};

export type RecyclerRecord = {
  id: string;
  name: string;
  city: string;
  specialty: string;
  verified: boolean;
  status: 'demo' | 'sample';
};

export type LotStatus = 'new' | 'accepted' | 'handover' | 'paid' | 'rejected';

export type Lot = {
  id: string;
  collectorId: string;
  recyclerId: string;
  material: string;
  weight: number;
  location: string;
  estimatedValue: number;
  status: LotStatus;
  paymentStatus: 'pending' | 'paid';
  handoverStatus: 'awaiting-handover' | 'completed';
  photo: string;
  createdAt: string;
  notes: string;
  source: string;
};
