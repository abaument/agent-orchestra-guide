import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SectionAI({ text }: { text: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function getSummary() {
    setLoading(true);
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Résume-moi ceci en 3 phrases max :\n\n${text}`,
          },
        ],
      }),
    }).then((r) => r.json());

    setSummary(res.choices[0].message.content.trim());
    setLoading(false);
  }

  return (
    <div className="rounded-xl bg-indigo-50 p-4 my-6 space-y-2">
      {!summary && (
        <Button onClick={getSummary} disabled={loading}>
          {loading ? "⏳" : "Voir le résumé IA"}
        </Button>
      )}
      {summary && <p className="text-sm italic">{summary}</p>}
    </div>
  );
}
