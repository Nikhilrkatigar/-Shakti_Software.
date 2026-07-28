import { useState, useEffect } from 'react';

export default function Admin() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => {
        // Fallback if not running via dev server, though we should be.
        console.error('Could not load content', err);
        setMessage('Error loading content. Are you running the dev server?');
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setMessage('Saved successfully! Check the live site.');
      } else {
        setMessage('Error saving content.');
      }
    } catch (err) {
      setMessage('Network error while saving.');
    }
    setSaving(false);
  };

  if (!data) return <div style={{ padding: '40px' }}>Loading Admin Panel...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Shakti Softwares CMS</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {message && <span style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: '10px 20px', background: '#0F5FB0', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <a href="/" target="_blank" style={{ color: '#0F5FB0', textDecoration: 'none' }}>View Site ↗</a>
        </div>
      </div>

      {/* Hero Section Edit */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <h2>Hero Section</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title Line 1</label>
            <input 
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              value={data.hero.titleLine1} 
              onChange={e => setData({ ...data, hero: { ...data.hero, titleLine1: e.target.value } })} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title Line 2</label>
            <input 
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              value={data.hero.titleLine2} 
              onChange={e => setData({ ...data, hero: { ...data.hero, titleLine2: e.target.value } })} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title Line 3</label>
            <input 
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              value={data.hero.titleLine3} 
              onChange={e => setData({ ...data, hero: { ...data.hero, titleLine3: e.target.value } })} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
            <textarea 
              rows={4}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              value={data.hero.description} 
              onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Button Text</label>
            <input 
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              value={data.hero.buttonText} 
              onChange={e => setData({ ...data, hero: { ...data.hero, buttonText: e.target.value } })} 
            />
          </div>
        </div>
      </div>

      {/* Advanced Edit (Raw JSON) */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2>Advanced (Raw Content)</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Edit the raw JSON file directly below to change any content on the site (Services, Testimonials, etc).</p>
        <textarea 
          rows={25}
          style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px' }}
          value={JSON.stringify(data, null, 2)} 
          onChange={e => {
            try {
              const parsed = JSON.parse(e.target.value);
              setData(parsed);
            } catch (err) {
              // Ignore invalid JSON while typing
            }
          }} 
        />
      </div>

    </div>
  );
}
