import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EvidenceLoop } from './EvidenceLoop'
import { commands, deterministicRows, requirements } from './content'
import './App.css'

const githubUrl = 'https://github.com/ravmax-rdl/Primer'
const cloneCommand = 'git clone https://github.com/ravmax-rdl/Primer.git'

function Arrow() {
  return <span className="arrow-glyph" aria-hidden="true">→</span>
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Primer home">
      <span className="wordmark-mark" aria-hidden="true">
        <i />
        <strong>π</strong>
      </span>
      <span>Primer</span>
    </a>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const reduceMotion = useReducedMotion()

  async function copyCloneCommand() {
    try {
      await navigator.clipboard.writeText(cloneCommand)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <main id="top">
      <header className="site-header page-shell">
        <Wordmark />
        <nav aria-label="Primary navigation">
          <a href="#method">Method <span>01</span></a>
          <a href="#commands">Commands <span>02</span></a>
          <a href="#local">Local-first <span>03</span></a>
        </nav>
        <a className="header-github" href={githubUrl} target="_blank" rel="noreferrer">
          GitHub <Arrow />
        </a>
      </header>

      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-ambient" aria-hidden="true">
          <span className="ambient-orbit ambient-orbit-one" />
          <span className="ambient-orbit ambient-orbit-two" />
          <span className="ambient-axis ambient-axis-x" />
          <span className="ambient-axis ambient-axis-y" />
        </div>

        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="eyebrow">Local-first academic vault</span>
          <h1 id="hero-title">Learning should<br />leave evidence.</h1>
          <p>Primer makes Pi probe, teach, assess, and record evidence in a local Obsidian vault.</p>
          <div className="hero-actions">
            <motion.a
              className="primary-cta"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={reduceMotion ? undefined : { x: 3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              View on GitHub <span><Arrow /></span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="hero-instrument"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          aria-label="Primer learning trace preview"
        >
          <div className="hero-instrument-bar">
            <span>PI / LEARNING TRACE</span>
            <span className="status-live"><i /> ACTIVE</span>
          </div>
          <div className="hero-scope" aria-hidden="true">
            <svg viewBox="0 0 620 510">
              <circle cx="310" cy="255" r="222" />
              <circle cx="310" cy="255" r="154" />
              <path className="hero-grid" d="M18 255H602M310 18V492" />
              <path className="hero-pentagon" d="M310 50 510 196 433 431 187 431 110 196Z" />
              <motion.path
                className="hero-trace"
                d="M310 50 510 196 433 431 187 431 110 196Z"
                initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.6, delay: 0.7, ease: [0.32, 0.72, 0, 1] }}
              />
              {[
                [310, 50, 'PROBE'],
                [510, 196, 'TEACH'],
                [433, 431, 'ASSESS'],
                [187, 431, 'RECORD'],
                [110, 196, 'NEXT'],
              ].map(([x, y, label], index) => (
                <g className="hero-node" key={label}>
                  <circle cx={x} cy={y} r="17" />
                  <circle className="hero-node-core" cx={x} cy={y} r="3" />
                  <text x={x} y={Number(y) + (index === 0 ? 34 : 31)} textAnchor="middle">{label}</text>
                </g>
              ))}
              <g className="hero-pi">
                <circle cx="310" cy="255" r="65" />
                <text x="310" y="278" textAnchor="middle">π</text>
              </g>
            </svg>
            <span className="hero-scope-label label-tl">SOURCE / 01</span>
            <span className="hero-scope-label label-br">EVIDENCE / ARMED</span>
          </div>
          <div className="hero-readout">
            <div><span>MODE</span><strong>diagnose first</strong></div>
            <div><span>STATE</span><strong>local vault</strong></div>
            <div><span>OUTPUT</span><strong>academic-evidence</strong></div>
          </div>
        </motion.div>

      </section>
      <div className="hero-proof page-shell">
        <span>OPEN SOURCE / MIT + CC BY 4.0</span>
        <span>OBSIDIAN 1.13+</span>
        <span>PROVIDER NEUTRAL</span>
        <span>WINDOWS · MACOS · LINUX</span>
      </div>

      <EvidenceLoop />

      <section className="comparison-section page-shell" aria-labelledby="comparison-title">
        <Reveal className="comparison-intro">
          <h2 id="comparison-title">Chat answers vanish.<br />Knowledge systems stay passive.</h2>
          <p>Primer joins the missing halves: an agent that teaches through evidence and a vault that keeps the result.</p>
        </Reveal>
        <div className="comparison-matrix">
          <Reveal className="comparison-row comparison-row-muted" delay={0.05}>
            <span className="matrix-index">01</span>
            <h3>Chatbot</h3>
            <p>Explains on demand. The answer disappears into history. No durable proof that you can retrieve or apply it.</p>
            <strong>Transient</strong>
          </Reveal>
          <Reveal className="comparison-row comparison-row-muted" delay={0.1}>
            <span className="matrix-index">02</span>
            <h3>Normal vault</h3>
            <p>Stores notes and sources. It does not diagnose the learner, grade an attempt, or choose the next action.</p>
            <strong>Passive</strong>
          </Reveal>
          <Reveal className="comparison-row comparison-row-primer" delay={0.15}>
            <span className="matrix-index">03</span>
            <h3>Primer</h3>
            <p>Runs the full loop. Every teaching decision points back to an observed answer and forward to one next action.</p>
            <strong><i /> Evidenced</strong>
          </Reveal>
        </div>
      </section>

      <section className="deterministic-section" aria-labelledby="deterministic-title">
        <div className="page-shell deterministic-grid">
          <Reveal className="deterministic-copy">
            <span className="eyebrow">Judgment where it belongs</span>
            <h2 id="deterministic-title">The model reasons.<br />The system remembers.</h2>
            <p>
              Pi owns questioning, explanation, comparison, and feedback. Standard-library
              Python owns the outcomes that should not drift between providers or sessions.
            </p>
          </Reveal>
          <Reveal className="deterministic-console" delay={0.1}>
            <div className="console-bar">
              <span>DETERMINISTIC CORE</span>
              <span>5 CHECKS / ONLINE</span>
            </div>
            {deterministicRows.map(([name, detail, owner], index) => (
              <motion.div
                className="console-row"
                key={name}
                whileHover={reduceMotion ? undefined : { x: 4 }}
              >
                <span className="console-number">0{index + 1}</span>
                <strong>{name}</strong>
                <p>{detail}</p>
                <small>{owner}</small>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="commands-section page-shell" id="commands" aria-labelledby="commands-title">
        <Reveal className="section-heading commands-heading">
          <div>
            <h2 id="commands-title">Five commands.<br />One academic system.</h2>
          </div>
          <p>Specialist procedures stay beneath the surface. The learner gets five memorable ways into the vault.</p>
        </Reveal>
        <div className="command-deck">
          <div className="command-deck-head">
            <span>COMMAND</span><span>OPERATION</span><span>ARTIFACT</span><span>STATE</span>
          </div>
          {commands.map((item, index) => (
            <motion.div
              className="command-row"
              key={item.command}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(147, 169, 119, 0.07)' }}
            >
              <code>{item.command}</code>
              <p>{item.purpose}</p>
              <strong>{item.output}</strong>
              <span className="command-state">ready</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="local-section" id="local" aria-labelledby="local-title">
        <div className="page-shell local-grid">
          <Reveal className="vault-window">
            <div className="vault-topbar">
              <span>PRIMER / VAULT</span>
              <span>LOCAL FILESYSTEM</span>
            </div>
            <div className="vault-body">
              <div className="vault-tree">
                <span className="tree-root">vault/</span>
                <span><i /> START HERE.md</span>
                <span><i /> .pi/</span>
                <span className="tree-indent"><i /> prompts/</span>
                <span className="tree-indent"><i /> scripts/</span>
                <span><i /> Study Notes/</span>
                <span className="tree-indent tree-active"><i /> Foundations of Logic.md</span>
                <span><i /> Papers &amp; Reviews/</span>
              </div>
              <div className="vault-note">
                <div className="note-meta">
                  <span>COURSE102</span>
                  <span>W01 / D01</span>
                  <span>LOCAL</span>
                </div>
                <h3>Foundations of Logic</h3>
                <div className="note-line note-line-long" />
                <div className="note-line" />
                <div className="note-map">
                  <span>premise</span><i /><span>inference</span><i /><span>claim</span>
                </div>
                <div className="note-record">
                  <small>academic-evidence</small>
                  <strong>ev_course102_0042</strong>
                  <span>next_action: retrieve in 3 days</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="local-copy" delay={0.1}>
            <h2 id="local-title">Local files.<br />Durable artifacts.</h2>
            <p>
              Sources, lessons, attempts, review cards, and next actions remain ordinary
              files in Obsidian. Primer ships no credentials, student records, sync settings,
              private course data, or generated caches.
            </p>
            <ul>
              <li><span>01</span> Provider-neutral Pi workflow</li>
              <li><span>02</span> Source provenance on every durable note</li>
              <li><span>03</span> Publication guard for sensitive files</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="demo-section page-shell" aria-labelledby="demo-title">
        <Reveal className="demo-copy">
          <span className="eyebrow">Start with a safe fixture</span>
          <h2 id="demo-title">See the whole loop<br />before adding your courses.</h2>
          <p>
            The fictional Foundations of Logic note demonstrates study, assessment,
            evidence, and review without redistributing lecture material or exam questions.
          </p>
          <motion.a
            className="primary-cta primary-cta-amber"
            href="https://github.com/ravmax-rdl/Primer/blob/main/vault/START%20HERE.md"
            target="_blank"
            rel="noreferrer"
            whileHover={reduceMotion ? undefined : { x: 3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          >
            Open demo vault <span><Arrow /></span>
          </motion.a>
        </Reveal>
        <Reveal className="demo-image-frame" delay={0.12}>
          <div className="demo-image-bar">
            <span>LIVE STUDY SESSION</span>
            <span>PROBE / LOCK-IN</span>
          </div>
          <div className="demo-image-wrap">
            <img
              src="https://raw.githubusercontent.com/ravmax-rdl/Primer/main/assets/agent-workflow.jpg"
              alt="Pi teaching a proof concept and asking a lock-in question during a Primer study session"
              loading="lazy"
            />
            <span className="demo-image-index">FIG. 01 / AGENT WORKFLOW</span>
          </div>
        </Reveal>
      </section>

      <section className="install-section" aria-labelledby="install-title">
        <div className="install-scan" aria-hidden="true" />
        <div className="page-shell">
          <Reveal className="install-heading">
            <h2 id="install-title">Make your next study session<br />leave a trace.</h2>
            <p>Clone the vault, verify the checkout, open it in Obsidian, then launch Pi from inside <code>vault/</code>.</p>
          </Reveal>
          <Reveal className="install-command" delay={0.08}>
            <span className="prompt">$</span>
            <code>{cloneCommand}</code>
            <motion.button
              className="primary-cta"
              type="button"
              onClick={copyCloneCommand}
              whileHover={reduceMotion ? undefined : { x: 3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              {copyState === 'copied' ? 'Copied to clipboard' : copyState === 'error' ? 'Copy unavailable' : 'Clone Primer'}
              <span>{copyState === 'copied' ? '✓' : <Arrow />}</span>
            </motion.button>
          </Reveal>
          <div className="requirements-strip">
            {requirements.map(([name, value]) => (
              <div key={name}><span>{name}</span><strong>{value}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <Wordmark />
        <p>Probe. Teach. Assess. Record. Continue.</p>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${githubUrl}/blob/main/docs/setup.md`} target="_blank" rel="noreferrer">Setup</a>
          <a href={`${githubUrl}/blob/main/docs/workflows.md`} target="_blank" rel="noreferrer">Workflows</a>
          <a href={`${githubUrl}/blob/main/LICENSE-CODE`} target="_blank" rel="noreferrer">MIT</a>
        </div>
      </footer>
    </main>
  )
}

export default App
