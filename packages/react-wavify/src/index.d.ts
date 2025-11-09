import React from 'react'

type WaveOptions = {
  height?: number
  amplitude?: number
  speed?: number
  points?: number
}

type EmojiConfig = {
  emojis: string[] // Array of emojis (max 10)
  floatOn?: 'top' | 'middle' | 'both' // Position emojis on top of wave, in the middle, or both
}

type BaseProps = Omit<
  React.SVGProps<SVGPathElement>,
  'ref' | 'height' | 'width' | 'points'
>

type WaveProps = BaseProps &
  WaveOptions & {
    paused?: boolean
    fill?: string
    options?: WaveOptions
    svgId?: string
    svgPathId?: string
    emojis?: EmojiConfig
  }

declare const Wave: React.FC<WaveProps>

export = Wave
