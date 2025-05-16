import React, { useState, FormEvent } from 'react';
import type { Bmc } from '@/lib/bmcAI'; // Types partagés

export default function BMCAutofill() {
  const [url, setUrl] = useState('');
  const [bmc, setBmc] = useState<Bmc | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(''); setBmc(null);
    try {
      const r = await fetch(`/api/bmc?url=${encodeURIComponent(url)}`);
      const json = await r.json();
      if (!r.ok) throw new Error(json.error ?? 'Erreur API');
      setBmc(json.bmc as Bmc);
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://startup.com"
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Analyse…' : 'Analyser'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {bmc && (
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {(Object.entries(bmc) as [keyof Bmc, string][]).map(([k, v]) => (
            <div key={k} className="border rounded p-3 bg-gray-50">
              <h3 className="font-semibold mb-2 uppercase text-xs text-gray-500">
                {k.replace(/_/g, ' ')}
              </h3>
              <p className="whitespace-pre-line">{v}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
