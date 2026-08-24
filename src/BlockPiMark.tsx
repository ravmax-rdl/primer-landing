type BlockPiMarkProps = {
  centerX: number
  centerY: number
  size: number
}

type PixelRectangle = {
  x: number
  y: number
  width: number
  height: number
  opacity?: number
}

const piRectangles: readonly PixelRectangle[] = [
  { x: 8, y: 10, width: 48, height: 4 },
  { x: 8, y: 14, width: 4, height: 4 },
  { x: 52, y: 14, width: 4, height: 4 },
  { x: 8, y: 18, width: 10, height: 4 },
  { x: 22, y: 18, width: 20, height: 4 },
  { x: 46, y: 18, width: 10, height: 4 },
  { x: 46, y: 22, width: 4, height: 22 },
  { x: 46, y: 44, width: 4, height: 1, opacity: 73 / 255 },
  { x: 50, y: 44, width: 8, height: 4 },
  { x: 14, y: 22, width: 4, height: 30 },
  { x: 22, y: 22, width: 4, height: 30 },
  { x: 38, y: 22, width: 4, height: 30 },
  { x: 54, y: 48, width: 4, height: 4 },
  { x: 14, y: 52, width: 12, height: 4 },
  { x: 42, y: 52, width: 16, height: 4 },
]

export function BlockPiMark({ centerX, centerY, size }: BlockPiMarkProps) {
  const scale = size / 64

  return (
    <g
      className="block-pi-mark"
      transform={`translate(${centerX - size / 2} ${centerY - size / 2}) scale(${scale})`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {piRectangles.map(({ x, y, width, height, opacity = 1 }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fillOpacity={opacity}
        />
      ))}
    </g>
  )
}
