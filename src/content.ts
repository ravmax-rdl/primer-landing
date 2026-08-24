export type MethodStage = {
  id: string
  label: string
  verb: string
  detail: string
  artifact: string
  field: string
  value: string
}

export type Command = {
  command: string
  purpose: string
  output: string
}

export const methodStages: MethodStage[] = [
  {
    id: '01',
    label: 'Probe',
    verb: 'Diagnose before explaining',
    detail: 'Pi asks for retrieval or application first, so the lesson starts from observed knowledge rather than assumed ability.',
    artifact: 'Learner response',
    field: 'probe_result',
    value: 'dependency gap located',
  },
  {
    id: '02',
    label: 'Teach',
    verb: 'Resolve one dependency',
    detail: 'The explanation stays narrow, source-linked, and answerable. Primer teaches only what the probe shows is missing.',
    artifact: 'Source-linked lesson',
    field: 'intervention',
    value: 'one dependency taught',
  },
  {
    id: '03',
    label: 'Assess',
    verb: 'Require retrieval again',
    detail: 'A lock-in question checks whether the learner can now retrieve, translate, or apply the idea without being carried.',
    artifact: 'Graded attempt',
    field: 'error_type',
    value: 'concept',
  },
  {
    id: '04',
    label: 'Record',
    verb: 'Write the evidence',
    detail: 'Primer appends a stable academic-evidence record to the note with the source, attempt, judgment, and record ID.',
    artifact: 'academic-evidence',
    field: 'record_id',
    value: 'ev_course102_0042',
  },
  {
    id: '05',
    label: 'Next action',
    verb: 'Close the loop',
    detail: 'One targeted action is selected from the observed error. The next session begins from evidence, not a learner persona.',
    artifact: 'Review decision',
    field: 'next_action',
    value: 'retrieve in 3 days',
  },
]

export const commands: Command[] = [
  { command: '/study', purpose: 'Probe, teach, practise, validate evidence, set one next action.', output: 'Evidence + review' },
  { command: '/capture', purpose: 'Normalize one source into a durable note with provenance.', output: 'Source note' },
  { command: '/research', purpose: 'Build claim-evidence rows before supported prose.', output: 'Claim matrix' },
  { command: '/exam', purpose: 'Time, grade, classify errors, and choose a card action.', output: 'Postmortem' },
  { command: '/doctor', purpose: 'Report the real state of every PDF source without rewriting data.', output: 'Source report' },
]

export const deterministicRows = [
  ['PDF truth', 'indexed · missing_target · no_text_layer', 'Python'],
  ['Evidence IDs', 'stable across sessions and providers', 'Python'],
  ['Error classes', '8 named assessment outcomes', 'Schema'],
  ['Card actions', 'create · revise · suspend · none', 'Rules'],
  ['Review dates', 'SM-2 scheduling from attempts', 'Python'],
]

export const requirements = [
  ['Obsidian', '1.13+'],
  ['Pi', 'tested 0.84.2'],
  ['Node.js', '22.19+'],
  ['Python', '3.10+'],
  ['Platforms', 'Win · macOS · Linux'],
]
