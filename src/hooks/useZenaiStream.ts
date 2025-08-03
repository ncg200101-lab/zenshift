import { useState } from 'react';
import { BASE_URL } from '../state/global/api';

export function useZenaiStream() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (input_text: string, zenai_model_id: string | null) => {
    setResponse('');
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/zenai/generateText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ input_text, zenai_model_id }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          chunk.split('__END_RESPONSE__').forEach(line => {
            if (line.startsWith('data: ')) {
              const data = line.replace('data: ', '');
              if (data.startsWith('[DONE')) {
                setLoading(false);
              } else if (!data.startsWith('[ERROR')) {
                setResponse(prev => prev + data);
              }
            }
          });
        }
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to generate ZenAI text');
      setLoading(false);
    }
  };

  return { response, loading, error, generate };
}