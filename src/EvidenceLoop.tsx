import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { BlockPiMark } from './BlockPiMark'
import { methodStages } from './content'

const nodePositions = [
  { x: 112, y: 96 },
  { x: 488, y: 96 },
  { x: 528, y: 304 },
  { x: 300, y: 432 },
  { x: 72, y: 304 },
]

function RecordRow({
  label,
  value,
  visible,
}: {
  label: string
  value: string
  visible: boolean
}) {
  return (
    <motion.div
      className="record-row"
      animate={{ opacity: visible ? 1 : 0.18, x: visible ? 0 : -8 }}
      transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
    >
      <span>{label}</span>
      <strong>{visible ? value : 'pending'}</strong>
    </motion.div>
  )
}

export function EvidenceLoop() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const traceProgress = useTransform(scrollYProgress, [0.08, 0.88], [0.02, 1])
  const scopeRotation = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 8])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStage = Math.min(methodStages.length - 1, Math.floor(latest * methodStages.length))
    setActiveStage((current) => (current === nextStage ? current : nextStage))
  })

  const current = methodStages[activeStage]

  return (
    <section className="evidence-loop" id="method" ref={sectionRef}>
      <div className="evidence-sticky page-shell">
        <header className="section-heading evidence-heading">
          <div>
            <h2>One closed loop.<br />Every decision evidenced.</h2>
          </div>
          <p>
            Pi does not begin with an answer. It finds the boundary of what you know,
            teaches one missing dependency, checks again, and leaves the result in your vault.
          </p>
        </header>

        <div className="instrument-frame">
          <div className="instrument-statusbar" aria-hidden="true">
            <span>TRACE / ACADEMIC-EVIDENCE</span>
            <span>SESSION 00:20:00</span>
            <span className="status-live"><i /> RECORDING</span>
          </div>

          <div className="instrument-grid">
            <ol className="stage-rail" aria-label="Primer learning loop stages">
              {methodStages.map((stage, index) => (
                <li key={stage.id} className={index === activeStage ? 'is-active' : index < activeStage ? 'is-complete' : ''}>
                  <span className="stage-index">{stage.id}</span>
                  <div>
                    <strong>{stage.label}</strong>
                    <small>{stage.artifact}</small>
                  </div>
                  <span className="stage-state">{index < activeStage ? 'done' : index === activeStage ? 'live' : 'wait'}</span>
                </li>
              ))}
            </ol>

            <div className="scope-wrap" aria-hidden="true">
              <motion.svg
                className="evidence-scope"
                viewBox="0 0 600 520"
                style={{ rotate: scopeRotation }}
              >
                <defs>
                  <filter id="trace-soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                <circle className="scope-ring scope-ring-outer" cx="300" cy="260" r="238" />
                <circle className="scope-ring" cx="300" cy="260" r="176" />
                <circle className="scope-ring scope-ring-inner" cx="300" cy="260" r="98" />
                <path className="scope-gridline" d="M20 260H580M300 16V504" />
                <path className="trace-base" d="M112 96 L488 96 L528 304 L300 432 L72 304 Z" />
                <motion.path
                  className="trace-glow"
                  d="M112 96 L488 96 L528 304 L300 432 L72 304 Z"
                  style={{ pathLength: reduceMotion ? 1 : traceProgress }}
                  filter="url(#trace-soft)"
                />
                <motion.path
                  className="trace-line"
                  d="M112 96 L488 96 L528 304 L300 432 L72 304 Z"
                  style={{ pathLength: reduceMotion ? 1 : traceProgress }}
                />
                {nodePositions.map((node, index) => (
                  <g key={methodStages[index].id} className={`scope-node ${index === activeStage ? 'is-active' : ''} ${index < activeStage ? 'is-complete' : ''}`}>
                    <circle cx={node.x} cy={node.y} r="20" />
                    <circle className="node-core" cx={node.x} cy={node.y} r="4" />
                    <text x={node.x} y={node.y + 38} textAnchor="middle">{methodStages[index].label.toUpperCase()}</text>
                  </g>
                ))}
                <g className="pi-core">
                  <circle cx="300" cy="260" r="54" />
                  <BlockPiMark centerX={300} centerY={260} size={58} />
                  <path d="M300 192V212M300 308V328M232 260H252M348 260H368" />
                </g>
              </motion.svg>
              <div className="scope-coordinate scope-coordinate-x">X 41.092</div>
              <div className="scope-coordinate scope-coordinate-y">Y 08.314</div>
            </div>

            <aside className="evidence-record" aria-live="polite">
              <div className="record-title">
                <span>ACADEMIC-EVIDENCE</span>
                <span className="record-id">0042</span>
              </div>
              <div className="record-subject">
                <small>ACTIVE OPERATION</small>
                <motion.strong
                  key={current.verb}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {current.verb}
                </motion.strong>
                <motion.p
                  key={current.detail}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {current.detail}
                </motion.p>
              </div>
              <div className="record-fields">
                <RecordRow label="course" value="COURSE102" visible />
                {methodStages.map((stage, index) => (
                  <RecordRow
                    key={stage.field}
                    label={stage.field}
                    value={stage.value}
                    visible={index <= activeStage}
                  />
                ))}
              </div>
              <div className="record-footer">
                <span>VALIDATION</span>
                <strong>{activeStage === methodStages.length - 1 ? 'record complete' : `${activeStage + 1} / ${methodStages.length}`}</strong>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
