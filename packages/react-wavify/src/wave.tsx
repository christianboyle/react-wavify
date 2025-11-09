import React, { Component } from 'react'
import type { WaveProps } from './types'

let reportedError: boolean

type Point = {
  x: number;
  y: number;
}

type EmojiPosition = {
  x: number;
  emoji: string;
}

class Wave extends Component<WaveProps, { path: string; waveLine: string; emojiPositions: EmojiPosition[] }> {

  private _container: React.RefObject<HTMLDivElement | null> = React.createRef()
  private _lastUpdate: Date | number = 0
  private _elapsed: number = 0
  private _step: number = 0
  private _frameId: number
  private _emojiXPositions: number[] = []

  constructor(props: WaveProps) {
    super(props)
    this.state = { path: '', waveLine: '', emojiPositions: [] }
    this._update = this._update.bind(this)
  }

  _calculateWavePoints() {
    const points = [] as Point[]
    for (let i = 0; i <= Math.max(this.props.points!, 1); i++) {
      const scale = 100
      const x = (i / this.props.points!) * this._width()
      const seed = (this._step + (i + (i % this.props.points!))) * this.props.speed! * scale
      const height = Math.sin(seed / scale) * this.props.amplitude!
      const y = Math.sin(seed / scale) * height + this.props.height!
      points.push({ x, y })
    }
    return points
  }

  _calculateWaveHeightAtX(x: number): number {
    const width = this._width()
    if (width === 0) return this.props.height || 20
    
    // Get the actual wave points for interpolation
    const points = this._calculateWavePoints()
    
    // Find the two points that bracket this x position
    let leftPoint = points[0]
    let rightPoint = points[points.length - 1]
    
    for (let i = 0; i < points.length - 1; i++) {
      if (x >= points[i].x && x <= points[i + 1].x) {
        leftPoint = points[i]
        rightPoint = points[i + 1]
        break
      }
    }
    
    // Linear interpolation between the two points
    if (rightPoint.x === leftPoint.x) {
      return leftPoint.y
    }
    
    const t = (x - leftPoint.x) / (rightPoint.x - leftPoint.x)
    return leftPoint.y + (rightPoint.y - leftPoint.y) * t
  }

  _initializeEmojiPositions() {
    if (!this.props.emojis || !this.props.emojis.emojis) {
      this._emojiXPositions = []
      return
    }

    const emojis = this.props.emojis.emojis.slice(0, 10) // Limit to 10
    const width = this._width()
    
    if (width === 0 || this._emojiXPositions.length === emojis.length) {
      return // Already initialized or container not ready
    }

    // Generate random x positions
    this._emojiXPositions = emojis.map(() => Math.random() * width)
    
    const emojiPositions: EmojiPosition[] = emojis.map((emoji, index) => ({
      x: this._emojiXPositions[index],
      emoji
    }))
    
    this.setState({ emojiPositions })
  }

  _renderEmojis() {
    if (!this.props.emojis || !this.props.emojis.emojis || this.state.emojiPositions.length === 0) {
      return null
    }

    const width = this._width()
    const height = this._height()
    const floatOn = this.props.emojis.floatOn || 'top'
    
    if (width === 0 || height === 0) {
      return null
    }

    // Middle of container height (50% of vertical height)
    const containerMiddle = height / 2

    if (floatOn === 'both') {
      // Alternate each emoji between top (on wave) and middle (below wave) positions
      return this.state.emojiPositions.map((pos, index) => {
        const waveHeightAtX = this._calculateWaveHeightAtX(pos.x)
        // Alternate between top and middle
        const useTop = (index % 2 === 0)
        
        let y: number
        if (useTop) {
          // Top position - on the wave line (same as floatOn='top')
          y = waveHeightAtX - 12
        } else {
          // Middle position - below the wave line (same as floatOn='middle')
          const offsetBelowWave = height * 0.5 // 50% of container height below the wave
          y = waveHeightAtX + offsetBelowWave - 12
        }
        
        y = Math.max(10, Math.min(y, height - 10))
        
        return (
          <text
            key={`emoji-${index}`}
            x={pos.x}
            y={y}
            fontSize="24"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {pos.emoji}
          </text>
        )
      })
    }

    return this.state.emojiPositions.map((pos, index) => {
      const waveHeightAtX = this._calculateWaveHeightAtX(pos.x)
      let y: number
      
      if (floatOn === 'middle') {
        // Position emoji below the wave line, offset by a percentage of container height
        // This creates more vertical separation from the 'top' variant
        const offsetBelowWave = height * 0.5 // 50% of container height below the wave
        y = waveHeightAtX + offsetBelowWave - 12
      } else {
        // Position emoji on top of the wave surface (follows wave)
        y = waveHeightAtX - 12 // Offset by half emoji size to center on wave
      }

      // Ensure emoji stays within bounds
      y = Math.max(10, Math.min(y, height - 10))
      
      return (
        <text
          key={`emoji-${index}`}
          x={pos.x}
          y={y}
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {pos.emoji}
        </text>
      )
    })
  }

  _buildPath(points: Point[]) {
    let svg = `M ${points[0].x} ${points[0].y}`
    const initial = {
      x: (points[1].x - points[0].x) / 2,
      y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
    }
    const cubic = (a: Point, b: Point) => ` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`
    svg += cubic(initial, points[1])
    let point = initial
    for (let i = 1; i < points.length - 1; i++) {
      point = {
        x: points[i].x - point.x + points[i].x,
        y: points[i].y - point.y + points[i].y
      }
      svg += cubic(point, points[i + 1])
    }
    svg += ` L ${this._width()} ${this._height()}`
    svg += ` L 0 ${this._height()} Z`
    return svg
  }

  _buildWaveLine(points: Point[]) {
    // Build just the top wave line (no fill area)
    let svg = `M ${points[0].x} ${points[0].y}`
    const initial = {
      x: (points[1].x - points[0].x) / 2,
      y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
    }
    const cubic = (a: Point, b: Point) => ` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`
    svg += cubic(initial, points[1])
    let point = initial
    for (let i = 1; i < points.length - 1; i++) {
      point = {
        x: points[i].x - point.x + points[i].x,
        y: points[i].y - point.y + points[i].y
      }
      svg += cubic(point, points[i + 1])
    }
    return svg
  }

  _width = () => this._container.current!.offsetWidth
  _height = () => this._container.current!.offsetHeight

  _redraw() {
    const points = this._calculateWavePoints()
    this.setState({
      path: this._buildPath(points),
      waveLine: this._buildWaveLine(points)
    })
  }

  _draw() {
    if (!this.props.paused) {
      const now = new Date()
      this._elapsed += (now as unknown as number) - (this._lastUpdate as unknown as number)
      this._lastUpdate = now
    }
    const scale = 1000
    this._step = (this._elapsed * Math.PI) / scale
    this._redraw()
  }

  _update() {
    this._draw()
    if (this._frameId) {
      this._resume()
    }
  }

  _resume() {
    this._frameId = window.requestAnimationFrame(this._update)
    this._lastUpdate = new Date()
  }

  componentDidMount() {
    if (!this._frameId) {
      this._resume()
    }
    // Initialize emoji positions after mount when container dimensions are available
    setTimeout(() => {
      this._initializeEmojiPositions()
    }, 0)
  }

  componentDidUpdate(prevProps: WaveProps) {
    // Reinitialize emojis if emoji config changed
    if (prevProps.emojis !== this.props.emojis) {
      this._emojiXPositions = []
      setTimeout(() => {
        this._initializeEmojiPositions()
      }, 0)
    }
    
    // Reinitialize if container width changed
    if (this._container.current && this._width() !== 0 && this._emojiXPositions.length === 0 && this.props.emojis?.emojis) {
      this._initializeEmojiPositions()
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._frameId)
    this._frameId = 0
  }

  render() {
    if (__isDev__) {
      if (
        !reportedError &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative'
      ) {
        reportedError = true
        throw new Error('react-wavify is not supported in react-native.')
      }
    }
    const {
      style,
      className,
      fill,
      paused,
      children,
      id,
      svgId,
      svgPathId,
      d,
      ref,
      height,
      amplitude,
      speed,
      points,
      emojis,
      ...rest
    } = this.props
    
    // If fill is none or transparent, use open path to avoid filled area
    const fillStr = String(fill || '').trim()
    const isFillNone = fillStr.toLowerCase() === 'none' || fillStr.toLowerCase() === 'transparent'
    const useOpenPath = isFillNone
    
    // Remove fill from rest to prevent override in both cases
    const restWithoutFill = Object.fromEntries(Object.entries(rest).filter(([key]) => key !== 'fill'))
    
    return (
      <div
        style={{ width: '100%', display: 'inline-block', ...style }}
        className={className}
        id={id}
        ref={this._container}
      >
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          id={svgId}
          style={{ background: 'transparent' }}
        >
          {children}
          {useOpenPath ? (
            this.state.waveLine ? (
              <path
                key="wave-line-open"
                d={this.state.waveLine}
                fill="none"
                fillRule="evenodd"
                style={{ fill: 'none', ...(typeof restWithoutFill.style === 'object' && restWithoutFill.style !== null ? restWithoutFill.style : {}) }}
                {...Object.fromEntries(Object.entries(restWithoutFill).filter(([key]) => key !== 'style'))}
              />
            ) : null
          ) : (
            !isFillNone && this.state.path ? (
              <path
                key="wave-filled"
                {...Object.assign(
                  {},
                  { d: this.state.path, fill, id: svgPathId },
                  restWithoutFill
                )}
              />
            ) : null
          )}
          {this._renderEmojis()}
        </svg>
      </div>
    )
  }
}

export default Wave
