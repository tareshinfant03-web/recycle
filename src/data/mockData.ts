import type { Category, PriceReference, RecyclerRecord, Lot } from '../types';

export const mockCategories: Category[] = [
  { id: 'cat-plastic', name: 'Plastic', unit: 'kg', active: true },
  { id: 'cat-paper', name: 'Paper', unit: 'kg', active: true },
  { id: 'cat-metal', name: 'Metal', unit: 'kg', active: true },
  { id: 'cat-glass', name: 'Glass', unit: 'kg', active: true },
  { id: 'cat-e-waste', name: 'E-waste', unit: 'kg', active: true }
];

export const mockPriceReferences: PriceReference[] = [
  { id: 'price-plastic', category: 'Plastic', rate: 22, source: 'Demo daily reference', updatedAt: '2026-11-16' },
  { id: 'price-paper', category: 'Paper', rate: 15, source: 'Demo daily reference', updatedAt: '2026-11-16' },
  { id: 'price-metal', category: 'Metal', rate: 48, source: 'Demo daily reference', updatedAt: '2026-11-16' },
  { id: 'price-glass', category: 'Glass', rate: 12, source: 'Demo daily reference', updatedAt: '2026-11-16' },
  { id: 'price-e-waste', category: 'E-waste', rate: 35, source: 'Demo daily reference', updatedAt: '2026-11-16' }
];

export const mockRecyclers: RecyclerRecord[] = [
  { id: 'R-1201', name: 'Pune Scrap Hub', city: 'Bhosari, Pune', specialty: 'Mixed plastic', verified: false, status: 'demo' },
  { id: 'R-1202', name: 'GreenLoop Metals', city: 'Nigdi, Pune', specialty: 'Steel and brass', verified: false, status: 'sample' },
  { id: 'R-1203', name: 'PaperCycle Demo', city: 'Kharadi, Pune', specialty: 'Paper and cardboard', verified: true, status: 'demo' },
  { id: 'R-1204', name: 'City Glass Works', city: 'Hadapsar, Pune', specialty: 'Glass sorting', verified: false, status: 'demo' }
];

export const mockLots: Lot[] = [
  {
    id: 'RL-2026-1001',
    collectorId: 'C-1001',
    recyclerId: 'R-1201',
    material: 'Plastic',
    weight: 18,
    location: 'Bhosari, Pune',
    estimatedValue: 396,
    status: 'accepted',
    paymentStatus: 'pending',
    handoverStatus: 'awaiting-handover',
    photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-11-15T09:30:00.000Z',
    notes: 'Clean plastic bottles and packaging',
    source: 'Demo workflow'
  },
  {
    id: 'RL-2026-1002',
    collectorId: 'C-1001',
    recyclerId: 'R-1202',
    material: 'Metal',
    weight: 26,
    location: 'Nigdi, Pune',
    estimatedValue: 1248,
    status: 'handover',
    paymentStatus: 'pending',
    handoverStatus: 'completed',
    photo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-11-14T11:15:00.000Z',
    notes: 'Steel and brass scrap with minimal contamination',
    source: 'Demo workflow'
  },
  {
    id: 'RL-2026-1003',
    collectorId: 'C-1001',
    recyclerId: 'R-1203',
    material: 'Paper',
    weight: 14,
    location: 'Kharadi, Pune',
    estimatedValue: 210,
    status: 'paid',
    paymentStatus: 'paid',
    handoverStatus: 'completed',
    photo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-11-13T15:45:00.000Z',
    notes: 'Cardboard boxes and newspaper bundles',
    source: 'Demo workflow'
  },
  {
    id: 'RL-2026-1004',
    collectorId: 'C-1001',
    recyclerId: 'R-1204',
    material: 'Glass',
    weight: 20,
    location: 'Hadapsar, Pune',
    estimatedValue: 240,
    status: 'new',
    paymentStatus: 'pending',
    handoverStatus: 'awaiting-handover',
    photo: 'https://images.unsplash.com/photo-1552397198-6c6f12f9d765?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-11-16T08:10:00.000Z',
    notes: 'Sorted glass bottles without caps',
    source: 'Demo workflow'
  }
];
