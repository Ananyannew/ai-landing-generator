import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenAI } from '@google/genai'

const app = express()
const PORT = process.env.PORT || 3001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

app.post('/api/generate', async (req, res) => {
  try {
    const { productName, productDescription, style } = req.body

    if (!productName || !productDescription) {
      return res.status(400).json({
        error: 'Product name and description are required.',
      })
    }

    const prompt = `
You are a professional landing page copywriter.

Create landing page content for this product:

Product name: ${productName}
Product description: ${productDescription}
Visual style: ${style}

IMPORTANT:
- Detect the language of the user's input.
- Write ALL generated content in the SAME language as the user's input.
- If the user writes in Russian, respond entirely in Russian.
- If the user writes in English, respond entirely in English.
- Do not translate the product name unless necessary.
- Do not use Lorem Ipsum.

Return ONLY valid JSON in this exact structure:

{
  "badge": "...",
  "headline": "...",
  "subheadline": "...",
  "benefits": ["...", "...", "..."],
  "featuresTitle": "...",
  "features": [
    {
      "title": "...",
      "description": "..."
    },
    {
      "title": "...",
      "description": "..."
    },
    {
      "title": "...",
      "description": "..."
    }
  ],
  "cta": "..."
}
`

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

    const landing = JSON.parse(response.text)

    res.json(landing)
  } catch (error) {
    console.error('Generation error:', error)

    res.status(500).json({
      error: 'Failed to generate landing page.',
    })
  }
})

const distPath = path.join(__dirname, 'dist')

app.use(express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI server running on port ${PORT}`)
})