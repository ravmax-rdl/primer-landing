import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const demoImages = [
  {
    src: 'https://raw.githubusercontent.com/ravmax-rdl/Primer/main/assets/agent-workflow.jpg',
    label: 'Pi probes and checks retrieval',
    caption: 'FIG. 01 / AGENT WORKFLOW',
    alt: 'Pi teaching a proof concept and asking a lock-in question during a Primer study session',
  },
  {
    src: 'https://raw.githubusercontent.com/ravmax-rdl/Primer/main/assets/vault-overview.jpg',
    label: 'The vault holds every artifact',
    caption: 'FIG. 02 / VAULT OVERVIEW',
    alt: 'Obsidian vault overview with a rendered Primer learning map',
  },
  {
    src: 'https://raw.githubusercontent.com/ravmax-rdl/Primer/main/assets/learning-artifact.jpg',
    label: 'Evidence survives the session',
    caption: 'FIG. 03 / LEARNING ARTIFACT',
    alt: 'A durable Primer learning artifact with a dependency map and academic evidence',
  },
]

export function DemoCarousel() {
  const [activeImage, setActiveImage] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % demoImages.length)
    }, 5200)

    return () => window.clearTimeout(timer)
  }, [activeImage, reduceMotion])

  return (
    <div
      className="demo-image-frame"
      role="region"
      aria-roledescription="carousel"
      aria-label="Primer demo images"
    >
      <div className="demo-image-bar">
        <span aria-live="polite">{demoImages[activeImage].label}</span>
        <div className="demo-carousel-nav" aria-label="Choose a demo image">
          {demoImages.map((image, index) => (
            <button
              type="button"
              key={image.caption}
              className={index === activeImage ? 'is-active' : ''}
              aria-label={`Show ${image.label.toLowerCase()}`}
              aria-current={index === activeImage ? 'true' : undefined}
              onClick={() => setActiveImage(index)}
            >
              0{index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-carousel-viewport">
        <motion.div
          className="demo-carousel-track"
          animate={{ x: `${activeImage * -100}%` }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.9,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {demoImages.map((image, index) => (
            <figure key={image.src} aria-hidden={index !== activeImage}>
              <div className="demo-image-wrap">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
              <figcaption className="demo-image-index">{image.caption}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
