import { useState } from 'react'
import './App.css'

const landingStyles = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean layout, restrained color, sharp messaging.',
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Bright SaaS energy with confident product storytelling.',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High contrast, direct copy, strong visual momentum.',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Polished editorial feel for premium products.',
  },
]

const styleLayouts = {
  minimal: 'layout-compact',
  startup: 'layout-saas',
  bold: 'layout-statement',
  elegant: 'layout-editorial',
}

const styleVariants = {
  minimal: {
    badge: 'Simple by design',
    headline: 'A clearer way to move your product forward.',
    subheadline:
      'Give your customers a focused experience built around what matters most.',
    benefits: ['Clear positioning', 'Less friction', 'Focused messaging'],
    featuresTitle: 'Everything your audience needs',
    features: [
      ['01', 'Simple experience', 'A clean product story that is easy to understand.'],
      ['02', 'Focused message', 'Lead with the value your customers actually care about.'],
      ['03', 'Built to convert', 'Turn attention into action with a clear next step.'],
    ],
    cta: 'Get started',
  },
  startup: {
    badge: 'Built for what is next',
    headline: 'Launch faster. Grow smarter.',
    subheadline:
      'Turn your product idea into a confident digital experience that is ready to scale.',
    benefits: ['Move faster', 'Scale with confidence', 'Convert more'],
    featuresTitle: 'Everything you need to launch',
    features: [
      ['01', 'Fast setup', 'Go from idea to polished product messaging in minutes.'],
      ['02', 'Built for growth', 'Create a foundation that grows with your business.'],
      ['03', 'Made for action', 'Guide visitors naturally toward your most important CTA.'],
    ],
    cta: 'Start building',
  },
  bold: {
    badge: 'Make an impact',
    headline: 'Stop blending in. Build something people remember.',
    subheadline:
      'A bold product experience with direct messaging, strong contrast, and zero unnecessary noise.',
    benefits: ['Stand out', 'Say it clearly', 'Drive action'],
    featuresTitle: 'Built to make your point',
    features: [
      ['01', 'Strong positioning', 'Make the value of your product impossible to miss.'],
      ['02', 'Direct communication', 'Say more with fewer words and a stronger point of view.'],
      ['03', 'Momentum', 'Give every section a clear purpose and direction.'],
    ],
    cta: 'Make it happen',
  },
  elegant: {
    badge: 'Thoughtfully crafted',
    headline: 'An elevated experience for products worth discovering.',
    subheadline:
      'Bring clarity, character, and refinement to the way your product meets its audience.',
    benefits: ['Refined design', 'Thoughtful details', 'Premium feel'],
    featuresTitle: 'Designed around your story',
    features: [
      ['01', 'Distinct character', 'Create a memorable presence without unnecessary complexity.'],
      ['02', 'Editorial clarity', 'Give every message room to breathe and every detail a purpose.'],
      ['03', 'Premium experience', 'Build trust through a considered and polished presentation.'],
    ],
    cta: 'Explore the experience',
  },
}

function buildLanding(productName, productDescription, selectedStyle, variantIndex = 0) {
  const variant = styleVariants[selectedStyle]

  const name = productName.trim() || 'Your product'
  const description =
    productDescription.trim() ||
    'A better way to present your product and connect with your customers.'

  const variations = [
    {
      headline: `${name}: ${variant.headline}`,
      subheadline: description,
    },
    {
      headline: `Meet ${name}. ${variant.headline}`,
      subheadline: `${description} ${variant.subheadline}`,
    },
    {
      headline: `${name} — ${variant.headline}`,
      subheadline: variant.subheadline,
    },
  ]

  const copy = variations[variantIndex % variations.length]

  return {
    badge: variant.badge,
    headline: copy.headline,
    subheadline: copy.subheadline,
    benefits: variant.benefits,
    featuresTitle: variant.featuresTitle,
    features: variant.features,
    cta: variant.cta,
  }
}

function App() {
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('minimal')
  const [landing, setLanding] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationIndex, setGenerationIndex] = useState(0)

  const generateLanding = () => {
    setIsGenerating(true)

    window.setTimeout(() => {
      setLanding(
        buildLanding(
          productName,
          productDescription,
          selectedStyle,
          generationIndex,
        ),
      )
      setGenerationIndex((index) => index + 1)
      setIsGenerating(false)
    }, 450)
  }

  const regenerateLanding = () => {
    setIsGenerating(true)

    window.setTimeout(() => {
      setLanding(
        buildLanding(
          productName,
          productDescription,
          selectedStyle,
          generationIndex,
        ),
      )
      setGenerationIndex((index) => index + 1)
      setIsGenerating(false)
    }, 450)
  }

  const clearAll = () => {
    setProductName('')
    setProductDescription('')
    setSelectedStyle('minimal')
    setLanding(null)
    setGenerationIndex(0)
    setIsGenerating(false)
  }

  const selectedStyleName =
    landingStyles.find((style) => style.id === selectedStyle)?.name || 'Minimal'

  return (
    <main className="app-shell">
      <header className="intro-panel">
        <p className="eyebrow">AI Landing Page Generator</p>
        <h1>Turn a product idea into a landing page concept.</h1>
        <p className="intro-copy">
          Describe your product, choose a visual direction, and generate a
          conversion-focused landing page preview in seconds.
        </p>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Editor</p>
              <h2>Describe the product</h2>
            </div>

            <span className="status-pill">
              {landing ? 'Generated' : 'Ready'}
            </span>
          </div>

          <label className="field">
            <span>Product name</span>
            <input
              type="text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="e.g. Flowdesk"
            />
          </label>

          <label className="field">
            <span>Product description</span>
            <textarea
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              placeholder="Describe what your product does and who it helps..."
            />
          </label>

          <fieldset className="style-picker">
            <legend>Landing style</legend>

            <div className="style-grid">
              {landingStyles.map((style) => (
                <label
                  key={style.id}
                  className={`style-option ${
                    selectedStyle === style.id ? 'is-selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="landing-style"
                    value={style.id}
                    checked={selectedStyle === style.id}
                    onChange={() => setSelectedStyle(style.id)}
                  />
                  <span>{style.name}</span>
                  <small>{style.description}</small>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="actions">
            <button
              type="button"
              className="primary-action"
              onClick={generateLanding}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Landing Page'}
            </button>

            <button
              type="button"
              className="ghost-action"
              onClick={clearAll}
              disabled={isGenerating}
            >
              Clear
            </button>
          </div>
        </aside>

        <section className="preview-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Preview</p>
              <h2>Generated landing page</h2>
            </div>

            {landing && (
              <button
                type="button"
                className="ghost-action compact"
                onClick={regenerateLanding}
                disabled={isGenerating}
              >
                Regenerate
              </button>
            )}
          </div>

          {isGenerating ? (
            <div className="loading-state">
              <div className="loading-dot" />
              <span>Generating your landing page...</span>
            </div>
          ) : landing ? (
            <article
              className={`landing-preview theme-${selectedStyle} ${styleLayouts[selectedStyle]}`}
            >
              <section className="preview-hero">
                <span className="preview-badge">{landing.badge}</span>

                <h3>{landing.headline}</h3>

                <p>{landing.subheadline}</p>

                <button type="button">{landing.cta}</button>
              </section>

              <section className="preview-benefits">
                {landing.benefits.map((benefit) => (
                  <div className="benefit-item" key={benefit}>
                    <span />
                    <p>{benefit}</p>
                  </div>
                ))}
              </section>

              <section className="preview-features">
                <div className="preview-section-heading">
                  <span>{selectedStyleName}</span>
                  <h4>{landing.featuresTitle}</h4>
                </div>

                <div className="feature-grid">
                  {landing.features.map(([number, title, description]) => (
                    <article className="feature-card" key={number}>
                      <span>{number}</span>
                      <h5>{title}</h5>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="preview-final-cta">
                <h4>Ready to take the next step?</h4>
                <button type="button">{landing.cta}</button>
              </section>
            </article>
          ) : (
            <div className="empty-preview">
              <div className="empty-preview-card">
                <span className="empty-icon">AI</span>
                <h3>Your landing page preview will appear here</h3>
                <p>
                  Add product details, choose a style, and generate a complete
                  landing page concept with conversion-focused sections.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App