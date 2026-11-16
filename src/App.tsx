import { useMemo, useState } from 'react';
import { mockCategories, mockPriceReferences, mockRecyclers, mockLots, type LotStatus } from './data/mockData';
import { isSupabaseConfigured } from './lib/supabase';
import type { Category, Lot, PriceReference, RecyclerRecord } from './types';

const translations = {
  en: {
    appName: 'RecyLink',
    tag: 'Kabadiwala Connect',
    roleCollector: 'Collector',
    roleRecycler: 'Recycler',
    roleAdmin: 'Admin',
    dashboard: 'Dashboard',
    createLot: 'Create lot',
    ledger: 'Ledger',
    matchingLots: 'Matching lots',
    queue: 'Queue',
    payments: 'Payments',
    categories: 'Categories',
    pricing: 'Sample prices',
    records: 'Recycler records',
    demoMode: 'Demo mode',
    liveMode: 'Supabase connected',
    createNewLot: 'Create lot',
    overview: 'Overview',
    nearbyRecyclers: 'Recycler recommendations',
    estimatedValue: 'Estimated value',
    material: 'Material',
    photo: 'Photo',
    weight: 'Approx. weight (kg)',
    location: 'Location',
    status: 'Status',
    amount: 'Amount',
    lotId: 'Lot ID',
    addCategory: 'Add category',
    updateStatus: 'Update status',
    accept: 'Accept',
    reject: 'Reject',
    handover: 'Handover',
    payment: 'Payment',
    paid: 'Paid',
    pending: 'Pending',
    notes: 'Notes',
    sampleRecyclerNote: 'Sample recycler. Not authorised.',
    valueNote: 'Estimated values below are demo references only.',
    lotCreated: 'Lot created',
    noAssociation: 'This is a demo record only. No official authorisation is claimed.'
  },
  hi: {
    appName: 'रिसाइकलिंक',
    tag: 'कबाड़ीवाला कनेक्ट',
    roleCollector: 'कलेक्टर',
    roleRecycler: 'रीसाइक्लर',
    roleAdmin: 'एडमिन',
    dashboard: 'डैशबोर्ड',
    createLot: 'लॉट बनाएं',
    ledger: 'लेजर',
    matchingLots: 'मिलान लॉट',
    queue: 'क्यू',
    payments: 'भुगतान',
    categories: 'श्रेणियाँ',
    pricing: 'नमूना कीमत',
    records: 'रीसाइक्लर रिकॉर्ड',
    demoMode: 'डेमो मोड',
    liveMode: 'सपाबेस चालू',
    createNewLot: 'नया लॉट बनाएं',
    overview: 'सारांश',
    nearbyRecyclers: 'सिफारिश किए गए रीसाइक्लर',
    estimatedValue: 'अनुमानित मूल्य',
    material: 'सामग्री',
    photo: 'फ़ोटो',
    weight: 'लगभग वजन (किलोग्राम)',
    location: 'स्थान',
    status: 'स्थिति',
    amount: 'राशि',
    lotId: 'लॉट आईडी',
    addCategory: 'श्रेणी जोड़ें',
    updateStatus: 'स्थिति अपडेट करें',
    accept: 'स्वीकारें',
    reject: 'अस्वीकारें',
    handover: 'सौंपना',
    payment: 'भुगतान',
    paid: 'भुगतान हो गया',
    pending: 'लंबित',
    notes: 'नोट्स',
    sampleRecyclerNote: 'यह नमूना रीसाइक्लर है। कोई अधिकृतता दावा नहीं है।',
    valueNote: 'नीचे दी गई कीमतें नमूना संदर्भ हैं, केवल डेमो के लिए।',
    lotCreated: 'लॉट बन गया',
    noAssociation: 'यह केवल डेमो रिकॉर्ड है। कोई आधिकारिक प्राधिकरण नहीं बताया गया है।'
  },
  mr: {
    appName: 'रेक्लिक',
    tag: 'कबाड़ीवाला कनेक्ट',
    roleCollector: 'कलेक्टर',
    roleRecycler: 'रिसायकलर',
    roleAdmin: 'अ‍ॅडमिन',
    dashboard: 'डॅशबोर्ड',
    createLot: 'लॉट तयार करा',
    ledger: 'लेजर',
    matchingLots: 'जुळणारे लॉट',
    queue: 'रांग',
    payments: 'पेमेंट',
    categories: 'श्रेणी',
    pricing: 'नमुना दर',
    records: 'रिसायकलर नोंदी',
    demoMode: 'डेमो मोड',
    liveMode: 'सुपाबेस जोडले',
    createNewLot: 'नवीन लॉट तयार करा',
    overview: 'सारांश',
    nearbyRecyclers: 'शिफारस केलेले रिसायकलर',
    estimatedValue: 'अंदाजे मूल्य',
    material: 'सामग्री',
    photo: 'फोटो',
    weight: 'अंदाजे वजन (किलो)',
    location: 'स्थान',
    status: 'स्थिती',
    amount: 'रक्कम',
    lotId: 'लॉट आयडी',
    addCategory: 'श्रेणी जोडा',
    updateStatus: 'स्थिती अपडेट करा',
    accept: 'स्वीकारा',
    reject: 'नकारा',
    handover: 'हस्तांतर',
    payment: 'पेमेंट',
    paid: 'पैसे भरले',
    pending: 'प्रलंबित',
    notes: 'नोंदी',
    sampleRecyclerNote: 'हा नमुना रिसायकलर आहे. कोणतीही अधिकृतता सांगितली नाही.',
    valueNote: 'खालील दर फक्त नमुना संदर्भासाठी आहेत.',
    lotCreated: 'लॉट तयार झाला',
    noAssociation: 'हा फक्त डेमो रेकॉर्ड आहे. अधिकृतता सांगितलेली नाही.'
  },
  ta: {
    appName: 'ரெசைக்ளிங்',
    tag: 'கபாடிவாலா கனெக்ட்',
    roleCollector: 'சேகரிப்பாளர்',
    roleRecycler: 'மறுசுழற்சி நிறுவனம்',
    roleAdmin: 'நிர்வாகி',
    dashboard: 'டாஷ்போர்டு',
    createLot: 'லாட் உருவாக்கு',
    ledger: 'லெட்ஜர்',
    matchingLots: 'பொருந்தும் லாட்கள்',
    queue: 'வரிசை',
    payments: 'கட்டணம்',
    categories: 'வகைகள்',
    pricing: 'மாதிரி விலை',
    records: 'மறுசுழற்சி பதிவுகள்',
    demoMode: 'டெமோ பயன்முறை',
    liveMode: 'சுபாஸே இணைக்கப்பட்டது',
    createNewLot: 'புதிய லாட் உருவாக்கு',
    overview: 'கண்ணோட்டம்',
    nearbyRecyclers: 'பரிந்துரைக்கப்பட்ட மறுசுழற்சி நிறுவனங்கள்',
    estimatedValue: 'மதிப்பீட்டின் மதிப்பு',
    material: 'பொருள்',
    photo: 'புகைப்படம்',
    weight: 'சராசரி எடை (கிலோ)',
    location: 'இடம்',
    status: 'நிலை',
    amount: 'தொகை',
    lotId: 'லாட் ஐடி',
    addCategory: 'வகையை சேர்க்க',
    updateStatus: 'நிலையை புதுப்பி',
    accept: 'ஏற்க',
    reject: 'மறுக்க',
    handover: 'மாற்றம்',
    payment: 'உயர்த்தல்',
    paid: 'செலுத்தப்பட்டது',
    pending: 'நிலுவை',
    notes: 'குறிப்புகள்',
    sampleRecyclerNote: 'இது மாதிரி மறுசுழற்சி நிறுவனம். அதிகாரப்பூர்வ அங்கீகாரம் இல்லை.',
    valueNote: 'கீழே உள்ள விலைகள் மாதிரி ரெferences மட்டுமே.',
    lotCreated: 'லாட் உருவாக்கப்பட்டது',
    noAssociation: 'இது மாதிரி பதிவு மட்டுமே. அதிகாரப்பூர்வ அங்கீகாரம் கூறப்படவில்லை.'
  }
} as const;

type Locale = keyof typeof translations;

type Role = 'collector' | 'recycler' | 'admin';

const roleConfig: Record<Role, { label: string; tabs: string[] }> = {
  collector: { label: 'Collector', tabs: ['dashboard', 'createLot', 'ledger'] },
  recycler: { label: 'Recycler', tabs: ['matchingLots', 'queue', 'payments'] },
  admin: { label: 'Admin', tabs: ['categories', 'pricing', 'records'] }
};

const demoSummary = [
  { label: 'Open lots', value: '08', detail: 'Across Pune' },
  { label: 'Earnings', value: '₹ 4,260', detail: 'This month' },
  { label: 'Avg. recovery', value: '78%', detail: 'Rate' },
  { label: 'Active pickups', value: '03', detail: 'Today' }
];

const formatCurrency = (value: number) => `₹ ${value.toLocaleString('en-IN')}`;

const useLocaleText = (locale: Locale) => translations[locale];

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [role, setRole] = useState<Role>('collector');
  const [screen, setScreen] = useState('dashboard');
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [priceReferences, setPriceReferences] = useState<PriceReference[]>(mockPriceReferences);
  const [recyclers, setRecyclers] = useState<RecyclerRecord[]>(mockRecyclers);
  const [lots, setLots] = useState<Lot[]>(mockLots);

  const t = useMemo(() => useLocaleText(locale), [locale]);

  const filteredLots = useMemo(() => {
    if (role === 'collector') return lots.filter((lot) => lot.collectorId === 'C-1001');
    if (role === 'recycler') return lots.filter((lot) => lot.recyclerId === 'R-1201' || lot.status === 'new');
    return lots;
  }, [lots, role]);

  const [form, setForm] = useState({
    category: categories[0]?.name ?? 'Plastic',
    weight: '19',
    location: 'Bhosari, Pune',
    photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
    notes: 'Mixed bottles and clean plastic sheets'
  });

  const estimate = useMemo(() => {
    const selected = priceReferences.find((entry) => entry.category === form.category);
    const weight = Number(form.weight) || 0;
    const rate = selected?.rate ?? 0;
    return weight * rate;
  }, [form.category, form.weight, priceReferences]);

  const addCategory = () => {
    const next = `Category ${categories.length + 1}`;
    setCategories((existing) => [
      ...existing,
      { id: `cat-${Date.now()}`, name: next, unit: 'kg', active: true }
    ]);
    setForm((current) => ({ ...current, category: next }));
  };

  const createLot = () => {
    const newLot: Lot = {
      id: `RL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      collectorId: 'C-1001',
      recyclerId: 'R-1201',
      material: form.category,
      weight: Number(form.weight) || 0,
      location: form.location,
      estimatedValue: estimate,
      status: 'new',
      paymentStatus: 'pending',
      handoverStatus: 'awaiting-handover',
      photo: form.photo,
      createdAt: new Date().toISOString(),
      notes: form.notes,
      source: 'Demo entry'
    };

    setLots((existing) => [newLot, ...existing]);
    setScreen(role === 'collector' ? 'dashboard' : 'createLot');
  };

  const updateLotStatus = (lotId: string, nextStatus: LotStatus) => {
    setLots((existing) =>
      existing.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              status: nextStatus,
              paymentStatus: nextStatus === 'paid' ? 'paid' : lot.paymentStatus,
              handoverStatus: nextStatus === 'paid' ? 'completed' : lot.handoverStatus
            }
          : lot
      )
    );
  };

  const updateRecyclerVerification = (recyclerId: string, nextValid: boolean) => {
    setRecyclers((existing) =>
      existing.map((entry) => (entry.id === recyclerId ? { ...entry, verified: nextValid } : entry))
    );
  };

  const selectedRoleTabs = roleConfig[role].tabs;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.tag}</p>
          <h1>{t.appName}</h1>
        </div>

        <div className="topbar-actions">
          <div className="segment role-segment" aria-label="Select role">
            {(['collector', 'recycler', 'admin'] as Role[]).map((item) => (
              <button
                key={item}
                className={role === item ? 'selected' : ''}
                onClick={() => setRole(item)}
                type="button"
              >
                {t[`role${item.charAt(0).toUpperCase() + item.slice(1)}` as keyof typeof t]}
              </button>
            ))}
          </div>

          <div className="segment locale-segment" aria-label="Select language">
            {(['en', 'hi', 'mr', 'ta'] as Locale[]).map((lang) => (
              <button
                key={lang}
                className={locale === lang ? 'selected' : ''}
                onClick={() => setLocale(lang)}
                type="button"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="status-banner">
        <span className="pill">{isSupabaseConfigured ? t.liveMode : t.demoMode}</span>
        <span>{t.valueNote}</span>
      </div>

      <main className="layout">
        <nav className="side-nav" aria-label="Role navigation">
          {selectedRoleTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={screen === tab ? 'tab active' : 'tab'}
              onClick={() => setScreen(tab)}
            >
              {t[tab as keyof typeof t] || tab}
            </button>
          ))}
        </nav>

        <section className="content-panel">
          {role === 'collector' && (
            <>
              {screen === 'dashboard' && (
                <div className="stack">
                  <div className="card-grid summary-grid">
                    {demoSummary.map((summary) => (
                      <article className="card" key={summary.label}>
                        <span className="muted">{summary.label}</span>
                        <strong>{summary.value}</strong>
                        <small>{summary.detail}</small>
                      </article>
                    ))}
                  </div>

                  <div className="card-grid two-col">
                    <article className="card">
                      <h3>{t.overview}</h3>
                      <ul className="lot-list">
                        {filteredLots.slice(0, 4).map((lot) => (
                          <li key={lot.id}>
                            <div>
                              <strong>{lot.id}</strong>
                              <small>{lot.material}</small>
                            </div>
                            <div className="right-col">
                              <span className={`chip ${lot.status}`}>{lot.status}</span>
                              <strong>{formatCurrency(lot.estimatedValue)}</strong>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </article>

                    <article className="card">
                      <h3>{t.nearbyRecyclers}</h3>
                      <ul className="rec-list">
                        {recyclers.slice(0, 3).map((recycler) => (
                          <li key={recycler.id}>
                            <div>
                              <strong>{recycler.name}</strong>
                              <small>{recycler.city}</small>
                            </div>
                            <div className="right-col">
                              <span className="muted">{recycler.specialty}</span>
                              <span className="chip demo">{recycler.verified ? 'Verified' : 'Demo'}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              )}

              {screen === 'createLot' && (
                <div className="card-grid two-col">
                  <article className="card form-card">
                    <h3>{t.createNewLot}</h3>
                    <label>
                      <span>{t.material}</span>
                      <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>{t.photo}</span>
                      <input type="url" value={form.photo} onChange={(event) => setForm((current) => ({ ...current, photo: event.target.value }))} />
                    </label>
                    <label>
                      <span>{t.weight}</span>
                      <input type="number" value={form.weight} onChange={(event) => setForm((current) => ({ ...current, weight: event.target.value }))} />
                    </label>
                    <label>
                      <span>{t.location}</span>
                      <input type="text" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
                    </label>
                    <label>
                      <span>{t.notes}</span>
                      <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
                    </label>
                    <div className="button-row">
                      <button type="button" className="primary" onClick={createLot}>{t.createLot}</button>
                      <button type="button" className="secondary" onClick={addCategory}>{t.addCategory}</button>
                    </div>
                  </article>

                  <article className="card estimate-card">
                    <h3>{t.estimatedValue}</h3>
                    <div className="big-amount">{formatCurrency(estimate)}</div>
                    <p className="muted">{t.valueNote}</p>
                    <div className="mini-list">
                      <span>{t.material}: {form.category}</span>
                      <span>{t.weight}: {form.weight} kg</span>
                      <span>{t.location}: {form.location}</span>
                    </div>
                    <div className="sample-note">{t.sampleRecyclerNote}</div>
                  </article>
                </div>
              )}

              {screen === 'ledger' && (
                <article className="card">
                  <h3>{t.ledger}</h3>
                  <ul className="lot-list">
                    {lots.slice(0, 6).map((lot) => (
                      <li key={lot.id}>
                        <div>
                          <strong>{lot.id}</strong>
                          <small>{lot.material}</small>
                        </div>
                        <div className="right-col">
                          <span className={`chip ${lot.status}`}>{lot.status}</span>
                          <strong>{formatCurrency(lot.estimatedValue)}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </>
          )}

          {role === 'recycler' && (
            <>
              {screen === 'matchingLots' && (
                <article className="card">
                  <h3>{t.matchingLots}</h3>
                  <div className="lot-list large">
                    {lots.slice(0, 5).map((lot) => (
                      <div className="lot-row" key={lot.id}>
                        <div className="lot-photo-wrap">
                          <img src={lot.photo} alt={lot.material} />
                        </div>
                        <div className="lot-info">
                          <strong>{lot.id}</strong>
                          <span>{lot.material}</span>
                          <small>{lot.location}</small>
                        </div>
                        <div className="lot-meta">
                          <span>{lot.weight} kg</span>
                          <strong>{formatCurrency(lot.estimatedValue)}</strong>
                          <div className="inline-buttons">
                            <button type="button" className="primary small" onClick={() => updateLotStatus(lot.id, 'accepted')}>{t.accept}</button>
                            <button type="button" className="secondary small" onClick={() => updateLotStatus(lot.id, 'rejected')}>{t.reject}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {screen === 'queue' && (
                <article className="card">
                  <h3>{t.queue}</h3>
                  <ul className="lot-list">
                    {lots.filter((lot) => lot.status === 'accepted' || lot.status === 'handover').map((lot) => (
                      <li key={lot.id}>
                        <div>
                          <strong>{lot.id}</strong>
                          <small>{lot.location}</small>
                        </div>
                        <div className="right-col">
                          <span className={`chip ${lot.status}`}>{lot.handoverStatus}</span>
                          <button type="button" className="primary small" onClick={() => updateLotStatus(lot.id, 'handover')}>{t.handover}</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {screen === 'payments' && (
                <article className="card">
                  <h3>{t.payments}</h3>
                  <ul className="lot-list">
                    {lots.filter((lot) => lot.status === 'handover' || lot.status === 'paid').map((lot) => (
                      <li key={lot.id}>
                        <div>
                          <strong>{lot.id}</strong>
                          <small>{lot.material}</small>
                        </div>
                        <div className="right-col">
                          <span className={`chip ${lot.status}`}>{lot.paymentStatus}</span>
                          <button type="button" className="primary small" onClick={() => updateLotStatus(lot.id, 'paid')}>{t.paid}</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </>
          )}

          {role === 'admin' && (
            <>
              {screen === 'categories' && (
                <div className="card-grid two-col">
                  <article className="card">
                    <h3>{t.categories}</h3>
                    <ul className="simple-list">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <span>{category.name}</span>
                          <button type="button" className="secondary small" onClick={() => setCategories((existing) => existing.filter((item) => item.id !== category.id))}>Remove</button>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="primary" onClick={addCategory}>{t.addCategory}</button>
                  </article>

                  <article className="card">
                    <h3>{t.overview}</h3>
                    <p className="muted">{t.noAssociation}</p>
                  </article>
                </div>
              )}

              {screen === 'pricing' && (
                <article className="card">
                  <h3>{t.pricing}</h3>
                  <ul className="simple-list">
                    {priceReferences.map((reference) => (
                      <li key={reference.id}>
                        <span>{reference.category}</span>
                        <strong>{formatCurrency(reference.rate)}/kg</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {screen === 'records' && (
                <article className="card">
                  <h3>{t.records}</h3>
                  <ul className="simple-list">
                    {recyclers.map((recycler) => (
                      <li key={recycler.id}>
                        <div>
                          <strong>{recycler.name}</strong>
                          <small>{recycler.city}</small>
                        </div>
                        <div className="right-col">
                          <span className="chip demo">{recycler.verified ? 'Verified demo' : 'Sample only'}</span>
                          <button type="button" className="secondary small" onClick={() => updateRecyclerVerification(recycler.id, !recycler.verified)}>
                            {recycler.verified ? 'Mark sample' : 'Verify demo'}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
