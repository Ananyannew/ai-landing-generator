import { useState } from 'react'
import './App.css'

const translations = {
  en: {
    eyebrow: 'AI Landing Page Generator',
    title: 'Turn a product idea into a landing page concept.',
    intro:
      'Describe your product, choose a visual direction, and generate a conversion-focused landing page preview in seconds.',
    editor: 'Editor',
    describeProduct: 'Describe the product',
    ready: 'Ready',
    generated: 'Generated',
    productName: 'Product name',
    productNamePlaceholder: 'e.g. Flowdesk',
    productDescription: 'Product description',
    productDescriptionPlaceholder:
      'Describe what your product does and who it helps...',
    businessType: 'Business type',
    targetAudience: 'Target audience',
    targetAudiencePlaceholder: 'e.g. Small business owners',
    landingGoal: 'Landing goal',
    textTone: 'Text tone',
    landingStyle: 'Landing style',
    generate: 'Generate Landing Page',
    generating: 'Generating...',
    download: 'Download HTML',
    clear: 'Clear',
    preview: 'Preview',
    generatedLanding: 'Generated landing page',
    regenerate: 'Regenerate',
    generatingPreview: 'Generating your landing page...',
    emptyTitle: 'Your landing page preview will appear here',
    emptyText:
      'Add product details, choose a style, and generate a complete landing page concept with conversion-focused sections.',
    readyToGenerate: 'Ready',
    nextStep: 'Ready to take the next step?',
  },

  ru: {
    eyebrow: 'AI Генератор лендингов',
    title: 'Превратите идею продукта в концепцию лендинга.',
    intro:
      'Опишите продукт, выберите визуальный стиль и создайте конверсионный лендинг за несколько секунд.',
    editor: 'Редактор',
    describeProduct: 'Опишите продукт',
    ready: 'Готов',
    generated: 'Сгенерировано',
    productName: 'Название продукта',
    productNamePlaceholder: 'например, Flowdesk',
    productDescription: 'Описание продукта',
    productDescriptionPlaceholder:
      'Опишите, что делает ваш продукт и кому он помогает...',
    businessType: 'Тип бизнеса',
    targetAudience: 'Целевая аудитория',
    targetAudiencePlaceholder: 'например, владельцы малого бизнеса',
    landingGoal: 'Цель лендинга',
    textTone: 'Тон текста',
    landingStyle: 'Стиль лендинга',
    generate: 'Создать лендинг',
    generating: 'Генерация...',
    download: 'Скачать HTML',
    clear: 'Очистить',
    preview: 'Предпросмотр',
    generatedLanding: 'Сгенерированный лендинг',
    regenerate: 'Сгенерировать заново',
    generatingPreview: 'Создаём ваш лендинг...',
    emptyTitle: 'Здесь появится предпросмотр лендинга',
    emptyText:
      'Добавьте информацию о продукте, выберите стиль и создайте полноценную концепцию лендинга.',
    readyToGenerate: 'Готов',
    nextStep: 'Готовы сделать следующий шаг?',
  },
}

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
function detectLanguage(text) {
  return /[а-яё]/i.test(text) ? 'ru' : 'en'
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
const russianStyleVariants = {
  minimal: {
    badge: 'Просто и по делу',
    headline: 'Более простой способ двигать ваш продукт вперёд.',
    subheadline:
      'Понятный и сфокусированный опыт, созданный вокруг самого важного.',
    benefits: ['Понятное позиционирование', 'Меньше лишнего', 'Фокус на главном'],
    featuresTitle: 'Всё необходимое для вашей аудитории',
    features: [
      ['01', 'Простой опыт', 'Чистая история продукта, которую легко понять.'],
      ['02', 'Фокус на ценности', 'Покажите клиентам именно то, что для них важно.'],
      ['03', 'Создано для результата', 'Превращайте внимание посетителей в действие.'],
    ],
    cta: 'Начать',
  },

  startup: {
    badge: 'Создано для роста',
    headline: 'Запускайтесь быстрее. Растите увереннее.',
    subheadline:
      'Превратите идею продукта в современный цифровой опыт, готовый к масштабированию.',
    benefits: ['Быстрый запуск', 'Уверенный рост', 'Больше клиентов'],
    featuresTitle: 'Всё необходимое для запуска',
    features: [
      ['01', 'Быстрый старт', 'От идеи до готовой презентации продукта за считанные минуты.'],
      ['02', 'Для роста', 'Создайте основу, которая будет развиваться вместе с бизнесом.'],
      ['03', 'Ориентировано на действие', 'Направляйте посетителей к нужному вам действию.'],
    ],
    cta: 'Начать создание',
  },

  bold: {
    badge: 'Будьте заметнее',
    headline: 'Перестаньте сливаться с другими. Создайте то, что запомнят.',
    subheadline:
      'Яркая презентация продукта с сильным сообщением, контрастом и без лишнего шума.',
    benefits: ['Выделяйтесь', 'Говорите прямо', 'Действуйте'],
    featuresTitle: 'Создано, чтобы вас заметили',
    features: [
      ['01', 'Сильное позиционирование', 'Сделайте ценность продукта очевидной с первого взгляда.'],
      ['02', 'Прямое сообщение', 'Говорите больше, используя меньше слов и больше смысла.'],
      ['03', 'Динамика', 'Каждый блок страницы должен вести пользователя вперёд.'],
    ],
    cta: 'Начать',
  },

  elegant: {
    badge: 'Продумано до деталей',
    headline: 'Премиальный опыт для продуктов, которые хочется открыть.',
    subheadline:
      'Добавьте ясность, характер и стиль в то, как ваш продукт встречает свою аудиторию.',
    benefits: ['Изысканный дизайн', 'Продуманные детали', 'Премиальное ощущение'],
    featuresTitle: 'Дизайн вокруг вашей истории',
    features: [
      ['01', 'Уникальный характер', 'Создайте запоминающийся образ без лишней сложности.'],
      ['02', 'Редакционная ясность', 'Дайте каждому сообщению пространство и смысл.'],
      ['03', 'Премиальный опыт', 'Вызывайте доверие благодаря продуманной презентации.'],
    ],
    cta: 'Посмотреть',
  },
}
function buildLanding(productName, productDescription, selectedStyle, variantIndex = 0) {
 const language = detectLanguage(`${productName} ${productDescription}`)
const variants = language === 'ru' ? russianStyleVariants : styleVariants
const variant = variants[selectedStyle]

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
  const [language, setLanguage] = useState('en')
  const t = translations[language]
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('minimal')
  const [businessType, setBusinessType] = useState('SaaS')
const [targetAudience, setTargetAudience] = useState('')
const [landingGoal, setLandingGoal] = useState('Продажа')
const [tone, setTone] = useState('Профессиональный')
  const [landing, setLanding] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationIndex, setGenerationIndex] = useState(0)

  const generateLanding = async () => {
  if (!productName.trim() || !productDescription.trim()) {
    return
  }

  setIsGenerating(true)

  try {
   const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
  productName,
  productDescription,
  style: selectedStyle,
  businessType,
  targetAudience,
  landingGoal,
  tone,
}),
    })

    if (!response.ok) {
      throw new Error('Failed to generate landing page')
    }

    const generatedLanding = await response.json()

    setLanding({
      ...generatedLanding,
      productName,
      productDescription,
      style: selectedStyle,
    })

    setGenerationIndex((index) => index + 1)
  } catch (error) {
    console.error(error)
    alert('Не удалось сгенерировать лендинг. Проверь, запущен ли AI-сервер.')
  } finally {
    setIsGenerating(false)
  }
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
const downloadHTML = () => {
  if (!landing) return

  const themes = {
    minimal: {
      bg: '#fbfbf8',
      hero: 'linear-gradient(180deg, #ffffff 0%, #f5f5ef 100%)',
      heading: '#151515',
      text: '#2f3437',
      muted: '#60676c',
      accent: '#2f6f64',
      border: '#ddded6',
      line: '#e3e3db',
      chip: 'rgba(47, 111, 100, 0.1)',
      card: '#ffffff',
      cta: '#f1f2eb',
      button: '#151515',
      buttonText: '#ffffff',
    },

    startup: {
      bg: '#f6f9ff',
      hero: 'radial-gradient(circle at 85% 10%, #d8f5ff 0, transparent 32%), linear-gradient(135deg, #ffffff 0%, #edf4ff 100%)',
      heading: '#0b1537',
      text: '#25345d',
      muted: '#596783',
      accent: '#2b5dff',
      border: '#d8e2ff',
      line: '#dde7ff',
      chip: 'rgba(43, 93, 255, 0.1)',
      card: '#ffffff',
      cta: '#eaf1ff',
      button: '#2b5dff',
      buttonText: '#ffffff',
    },

    bold: {
      bg: '#111111',
      hero: 'linear-gradient(135deg, #111111 0%, #262626 56%, #ffdc5e 100%)',
      heading: '#ffffff',
      text: '#f7f2df',
      muted: '#ddd4bd',
      accent: '#ffdc5e',
      border: '#292929',
      line: 'rgba(255, 255, 255, 0.14)',
      chip: 'rgba(255, 220, 94, 0.12)',
      card: '#1c1c1c',
      cta: '#171717',
      button: '#ffdc5e',
      buttonText: '#111111',
    },

    elegant: {
      bg: '#f9f7f2',
      hero: 'linear-gradient(135deg, #fdfbf7 0%, #eee7db 100%)',
      heading: '#261f1a',
      text: '#443c35',
      muted: '#746b61',
      accent: '#8d5a2b',
      border: '#e1d7c9',
      line: '#e5dbcf',
      chip: 'rgba(141, 90, 43, 0.1)',
      card: 'rgba(255, 255, 255, 0.72)',
      cta: '#efe7dc',
      button: '#261f1a',
      buttonText: '#ffffff',
    },
  }

  const layouts = {
    minimal: {
      heroMinHeight: '380px',
      heroPadding: '54px',
      featureMinHeight: '148px',
      featuresColumns: 'repeat(3, minmax(0, 1fr))',
    },

    startup: {
      heroMinHeight: '430px',
      heroPadding: '54px',
      featureMinHeight: '172px',
      featuresColumns: 'repeat(3, minmax(0, 1fr))',
    },

    bold: {
      heroMinHeight: '460px',
      heroPadding: '54px',
      featureMinHeight: '190px',
      featuresColumns: 'repeat(3, minmax(0, 1fr))',
    },

    elegant: {
      heroMinHeight: '440px',
      heroPadding: '54px 72px',
      featureMinHeight: '172px',
      featuresColumns: '1fr',
    },
  }

  const theme = themes[selectedStyle] || themes.startup
  const layout = layouts[selectedStyle] || layouts.startup

  const benefitsHtml = landing.benefits
    .map(
      (benefit) => `
        <div class="benefit-item">
          <span></span>
          <p>${benefit}</p>
        </div>
      `,
    )
    .join('')

  const featuresHtml = landing.features
    .map(
      (feature, index) => `
        <article class="feature-card">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h5>${feature.title}</h5>
          <p>${feature.description}</p>
        </article>
      `,
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="auto">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${landing.headline}</title>

  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      min-height: 100%;
    }

    body {
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

      background: ${theme.bg};
      color: ${theme.text};
    }

    .landing-preview {
      overflow: hidden;
      min-height: 100vh;
      background: ${theme.bg};
      color: ${theme.text};
    }

    .preview-hero {
      display: grid;
      gap: 18px;
      min-height: ${layout.heroMinHeight};
      padding: ${layout.heroPadding};
      align-content: center;
      background: ${theme.hero};
    }

    .preview-badge {
      width: fit-content;
      border: 1px solid ${theme.border};
      border-radius: 999px;
      padding: 7px 12px;

      color: ${theme.accent};
      background: ${theme.chip};

      font-size: 0.82rem;
      font-weight: 900;
    }

    .preview-hero h3 {
      max-width: 680px;
      margin: 0;

      color: ${theme.heading};

      font-size: clamp(2.1rem, 5vw, 4.3rem);
      line-height: 0.98;
    }

    .preview-hero p {
      max-width: 690px;
      margin: 0;

      color: ${theme.muted};

      font-size: 1.08rem;
      line-height: 1.6;
    }

    .preview-hero button,
    .preview-final-cta button {
      width: fit-content;
      min-height: 46px;
      margin-top: 4px;

      padding: 0 18px;

      border: 0;
      border-radius: 8px;

      color: ${theme.buttonText};
      background: ${theme.button};

      font: inherit;
      font-weight: 800;

      cursor: pointer;
    }

    .preview-benefits {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));

      border-block: 1px solid ${theme.line};

      background: ${theme.bg};
    }

    .benefit-item {
      display: grid;
      gap: 14px;

      padding: 24px;

      border-right: 1px solid ${theme.line};
    }

    .benefit-item:last-child {
      border-right: 0;
    }

    .benefit-item span {
      width: 28px;
      height: 5px;

      border-radius: 999px;

      background: ${theme.accent};
    }

    .benefit-item p {
      margin: 0;

      color: ${theme.text};

      font-weight: 800;
      line-height: 1.5;
    }

    .preview-features {
      display: grid;
      grid-template-columns: ${
        selectedStyle === 'elegant'
          ? '0.8fr 1.2fr'
          : '1fr'
      };

      gap: 24px;

      padding: 42px;

      background: ${theme.bg};
    }

    .preview-section-heading {
      display: grid;
      gap: 8px;
    }

    .preview-section-heading span {
      color: ${theme.accent};

      font-size: 0.8rem;
      font-weight: 900;

      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .preview-section-heading h4 {
      margin: 0;

      color: ${theme.heading};

      font-size: clamp(1.6rem, 3vw, 2.4rem);
      line-height: 1.08;
    }

    .feature-grid {
      display: grid;

      grid-template-columns: ${layout.featuresColumns};

      gap: 14px;
    }

    .feature-card {
      display: grid;
      gap: 10px;

      min-height: ${layout.featureMinHeight};

      border: 1px solid ${theme.border};
      border-radius: 8px;

      padding: 20px;

      background: ${theme.card};
    }

    .feature-card > span {
      color: ${theme.accent};

      font-size: 0.78rem;
      font-weight: 900;
    }

    .feature-card h5 {
      margin: 0;

      color: ${theme.heading};

      font-size: 1rem;
    }

    .feature-card p {
      margin: 0;

      color: ${theme.muted};

      font-size: 0.92rem;
      line-height: 1.55;
    }

    .preview-final-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 20px;

      padding: 34px 42px;

      border-top: 1px solid ${theme.line};

      background: ${theme.cta};
    }

    .preview-final-cta h4 {
      margin: 0;

      color: ${theme.heading};

      font-size: clamp(1.6rem, 3vw, 2.4rem);
      line-height: 1.08;
    }

    @media (max-width: 960px) {
      .preview-benefits,
      .feature-grid {
        grid-template-columns: 1fr;
      }

      .preview-features {
        grid-template-columns: 1fr;
      }

      .benefit-item {
        border-right: 0;
        border-bottom: 1px solid ${theme.line};
      }

      .benefit-item:last-child {
        border-bottom: 0;
      }

      .preview-final-cta {
        align-items: flex-start;
        flex-direction: column;
      }
    }

    @media (max-width: 620px) {
      .preview-hero {
        padding: 34px 24px;
      }

      .preview-features,
      .preview-final-cta {
        padding: 28px 24px;
      }
    }
  </style>
</head>

<body>

  <article class="landing-preview">

    <section class="preview-hero">
      <span class="preview-badge">
        ${landing.badge}
      </span>

      <h3>
        ${landing.headline}
      </h3>

      <p>
        ${landing.subheadline}
      </p>

      <button type="button">
        ${landing.cta}
      </button>
    </section>

    <section class="preview-benefits">
      ${benefitsHtml}
    </section>

    <section class="preview-features">

      <div class="preview-section-heading">
        <span>
          ${selectedStyleName}
        </span>

        <h4>
          ${landing.featuresTitle}
        </h4>
      </div>

      <div class="feature-grid">
        ${featuresHtml}
      </div>

    </section>

    <section class="preview-final-cta">

      <h4>
        Ready to take the next step?
      </h4>

      <button type="button">
        ${landing.cta}
      </button>

    </section>

  </article>

</body>
</html>
`

  const blob = new Blob(
    [html],
    { type: 'text/html;charset=utf-8' },
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `${productName || 'landing-page'}.html`

  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
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
  <div className="header-top">
   <p className="eyebrow">{t.eyebrow}</p>

    <div className="language-switcher">
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>

      <button
        type="button"
        className={language === 'ru' ? 'active' : ''}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
    </div>
  </div>
       <h1>{t.title}</h1>
<p className="intro-copy">{t.intro}</p>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <div className="panel-heading">
            <div>
             <p className="section-kicker">{t.editor}</p>
<h2>{t.describeProduct}</h2>
            </div>

            <span className="status-pill">
              {landing ? 'Generated' : 'Ready'}
            </span>
          </div>

          <label className="field">
            <span>{t.productName}</span>
            <input
              type="text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
           placeholder={t.productNamePlaceholder}
            />
          </label>

          <label className="field">
          <span>{t.productDescription}</span>
            <textarea
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            placeholder={t.productDescriptionPlaceholder}
            />
          </label>

<label className="field">
 <span>{t.businessType}</span>
  <select
    value={businessType}
    onChange={(event) => setBusinessType(event.target.value)}
  >
  <option>SaaS</option>
<option>{language === 'ru' ? 'Интернет-магазин' : 'E-commerce'}</option>
<option>{language === 'ru' ? 'Агентство' : 'Agency'}</option>
<option>{language === 'ru' ? 'Мобильное приложение' : 'Mobile app'}</option>
<option>{language === 'ru' ? 'Сервис' : 'Service'}</option>
<option>{language === 'ru' ? 'Другое' : 'Other'}</option>
  </select>
</label>

<label className="field">
  <span>{t.targetAudience}</span>
  <input
    type="text"
    value={targetAudience}
    onChange={(event) => setTargetAudience(event.target.value)}
    placeholder={t.targetAudiencePlaceholder}
  />
</label>

<label className="field">
  <span>{t.landingGoal}</span>
  <select
    value={landingGoal}
    onChange={(event) => setLandingGoal(event.target.value)}
  >
    <option>{language === 'ru' ? 'Продажа' : 'Sales'}</option>
    <option>{language === 'ru' ? 'Заявка' : 'Lead generation'}</option>
    <option>{language === 'ru' ? 'Регистрация' : 'Sign up'}</option>
    <option>
      {language === 'ru' ? 'Скачать приложение' : 'Download app'}
    </option>
  </select>
</label>

<label className="field">
  <span>{t.textTone}</span>
  <select
    value={tone}
    onChange={(event) => setTone(event.target.value)}
  >
    <option>
      {language === 'ru' ? 'Профессиональный' : 'Professional'}
    </option>
    <option>
      {language === 'ru' ? 'Дружелюбный' : 'Friendly'}
    </option>
    <option>
      {language === 'ru' ? 'Премиальный' : 'Premium'}
    </option>
    <option>
      {language === 'ru' ? 'Энергичный' : 'Energetic'}
    </option>
  </select>
</label>



          <fieldset className="style-picker">
           <legend>{t.landingStyle}</legend>

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
             {isGenerating ? t.generating : t.generate}
            </button>
<button
  type="button"
  className="ghost-action"
  onClick={downloadHTML}
  disabled={!landing || isGenerating}
>
 {t.download}
</button>
            <button
              type="button"
              className="ghost-action"
              onClick={clearAll}
              disabled={isGenerating}
            >
             {t.clear}
            </button>
          </div>
        </aside>

        <section className="preview-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">{t.preview}</p>
<h2>{t.generatedLanding}</h2>
            </div>

            {landing && (
              <button
                type="button"
                className="ghost-action compact"
                onClick={regenerateLanding}
                disabled={isGenerating}
              >
               {t.regenerate}
              </button>
            )}
          </div>

          {isGenerating ? (
            <div className="loading-state">
              <div className="loading-dot" />
             <span>{t.generatingPreview}</span>
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
                {landing.features.map((feature, index) => (
  <article className="feature-card" key={index}>
    <span>{String(index + 1).padStart(2, '0')}</span>
    <h5>{feature.title}</h5>
    <p>{feature.description}</p>
  </article>
))}
                </div>
              </section>

              <section className="preview-final-cta">
              <h4>{t.nextStep}</h4>
                <button type="button">{landing.cta}</button>
              </section>
            </article>
          ) : (
            <div className="empty-preview">
              <div className="empty-preview-card">
                <span className="empty-icon">AI</span>
                <h3>{t.emptyTitle}</h3>
                <p>{t.emptyText}</p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App