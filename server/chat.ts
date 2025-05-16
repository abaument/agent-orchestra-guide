import "dotenv/config"
import express from "express"
import type { Request, Response } from "express"

const app = express()
app.use(express.json())

interface Msg {
  role: "user" | "assistant" | "system"
  content: string
}

app.post(
  "/api/chat",
  async (req: Request<{}, any, { messages: Msg[] }>, res: Response) => {
    const { messages } = req.body
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "OPENAI_API_KEY manquante" })
      return
    }

    try {
      const system: Msg = {
        role: "system",
        content:
          "Tu es Agent‑Orchestra‑Expert, spécialiste des systèmes multi‑agents IA et sur l'IA plus généralement " +
          "Réponds uniquement sur ce sujet. Si la question sort du domaine, " +
          "réponds : « Désolé, je suis spécialisé dans les SMA ».",
      }

      const openaiRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini", // ou gpt-3.5-turbo
            messages: [system, ...messages],
            temperature: 0.7,
          }),
        }
      )

      const data = await openaiRes.json()
      res.json(data)
    } catch (err) {
      res.status(500).json({ error: "Erreur OpenAI" })
    }
  }
)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`🔌  API prête : http://localhost:${PORT}`))
