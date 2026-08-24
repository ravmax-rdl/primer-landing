type BlockPiMarkProps = {
  centerX: number
  centerY: number
  size: number
}

export function BlockPiMark({ centerX, centerY, size }: BlockPiMarkProps) {
  const scale = size / 64

  return (
    <g
      className="block-pi-mark"
      transform={`translate(${centerX - size / 2} ${centerY - size / 2}) scale(${scale})`}
      aria-hidden="true"
    >
      <path d="M6 7H58V18H50V43C50 50 52 53 58 53V63C45 63 39 57 39 44V18H25V38C25 52 18 60 6 63V52C12 50 14 46 14 38V18H6V7Z" />
    </g>
  )
}
