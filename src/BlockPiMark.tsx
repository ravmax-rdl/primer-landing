type BlockPiMarkProps = {
  centerX: number
  centerY: number
  size: number
}

const piPixels = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
  [1, 1], [7, 1],
  [1, 2], [7, 2],
  [1, 3], [7, 3],
  [1, 4], [7, 4],
  [1, 5], [7, 5],
  [1, 6], [7, 6],
  [0, 7], [1, 7], [7, 7], [8, 7],
  [0, 8], [8, 8],
] as const

export function BlockPiMark({ centerX, centerY, size }: BlockPiMarkProps) {
  const scale = size / 64

  return (
    <g
      className="block-pi-mark"
      transform={`translate(${centerX - size / 2} ${centerY - size / 2}) scale(${scale})`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {piPixels.map(([column, row]) => (
        <rect
          key={`${column}-${row}`}
          x={1 + column * 7}
          y={1 + row * 7}
          width="6"
          height="6"
        />
      ))}
    </g>
  )
}
