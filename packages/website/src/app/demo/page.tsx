'use client'

import React, { useState } from 'react'
import Wave from 'react-wavify'

const DemoPage: React.FC = () => {
  const [emojis1, setEmojis1] = useState(['🌊', '🐠', '🐙', '🦀', '🐡'])
  const [floatOn1, setFloatOn1] = useState<'top' | 'middle' | 'both'>('top')
  const [emojis2, setEmojis2] = useState(['✨', '⭐', '💫', '🌟'])
  const [floatOn2, setFloatOn2] = useState<'top' | 'middle' | 'both'>('middle')
  const [emojis3, setEmojis3] = useState(['🌊', '🐠', '✨', '⭐', '🐙', '💫', '🦀', '🌟'])
  const [floatOn3, setFloatOn3] = useState<'top' | 'middle' | 'both'>('both')
  const [isPaused, setIsPaused] = useState(false)

  const handleEmojiInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    current: string[]
  ) => {
    // Split by spaces or commas and filter out empty strings
    const emojis = value
      .split(/[\s,]+/)
      .filter(emoji => emoji.trim().length > 0)
      .slice(0, 10) // Limit to 10 emojis
    setter(emojis.length > 0 ? emojis : current)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #111827, #1f2937, #111827)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#ffffff'
        }}>
          Emoji Wave Demo
        </h1>

        {/* Controls */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #374151'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
          </div>
        </div>

        {/* Example 0 - Default (No Emojis) */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Example 0 (Default) 🌊
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Standard wave without emojis - this is the default behavior
          </p>

          <div style={{
            height: '12rem',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <Wave
              paused={isPaused}
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              options={{
                height: 30,
                amplitude: 30,
                speed: 0.2,
                points: 4
              }}
            />
          </div>
        </div>

        {/* Example 1 */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Example 1 🌊
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Emojis float up and down with the wave animation
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Emojis (space or comma separated, max 10):
            </label>
            <input
              type="text"
              value={emojis1.join(' ')}
              onChange={(e) => handleEmojiInput(e.target.value, setEmojis1, emojis1)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              placeholder="🌊 🐠 🐙 🦀"
            />
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
              Current: {emojis1.length} emoji{emojis1.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Float On:
            </label>
            <select
              value={floatOn1}
              onChange={(e) => setFloatOn1(e.target.value as 'top' | 'middle' | 'both')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div style={{
            height: '12rem',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <Wave
              paused={isPaused}
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              options={{
                height: 30,
                amplitude: 30,
                speed: 0.2,
                points: 4
              }}
              emojis={{
                emojis: emojis1,
                floatOn: floatOn1
              }}
            />
          </div>
        </div>

        {/* Example 2 */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Example 2 ✨
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Different emojis floating with the wave
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Emojis (space or comma separated, max 10):
            </label>
            <input
              type="text"
              value={emojis2.join(' ')}
              onChange={(e) => handleEmojiInput(e.target.value, setEmojis2, emojis2)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              placeholder="✨ ⭐ 💫 🌟"
            />
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
              Current: {emojis2.length} emoji{emojis2.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Float On:
            </label>
            <select
              value={floatOn2}
              onChange={(e) => setFloatOn2(e.target.value as 'top' | 'middle' | 'both')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div style={{
            height: '12rem',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <Wave
              paused={isPaused}
              fill="none"
              stroke="rgba(168, 85, 247, 0.3)"
              strokeWidth="2"
              options={{
                height: 30,
                amplitude: 30,
                speed: 0.2,
                points: 4
              }}
              emojis={{
                emojis: emojis2,
                floatOn: floatOn2
              }}
            />
          </div>
        </div>

        {/* Example 3 */}
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Example 3 🎨
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Mix of different emojis floating together
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Emojis (space or comma separated, max 10):
            </label>
            <input
              type="text"
              value={emojis3.join(' ')}
              onChange={(e) => handleEmojiInput(e.target.value, setEmojis3, emojis3)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              placeholder="🌊 🐠 ✨ ⭐"
            />
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
              Current: {emojis3.length} emoji{emojis3.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#d1d5db',
              marginBottom: '0.5rem'
            }}>
              Float On:
            </label>
            <select
              value={floatOn3}
              onChange={(e) => setFloatOn3(e.target.value as 'top' | 'middle' | 'both')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                color: '#ffffff',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div style={{
            height: '16rem',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <Wave
              paused={isPaused}
              fill="none"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
              options={{
                height: 40,
                amplitude: 40,
                speed: 0.25,
                points: 5
              }}
              emojis={{
                emojis: emojis3,
                floatOn: floatOn3
              }}
            />
          </div>
        </div>

        {/* Info Section */}
        <div style={{
          marginTop: '2rem',
          backgroundColor: '#1f2937',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>Usage:</h3>
          <pre style={{
            backgroundColor: '#111827',
            color: '#4ade80',
            padding: '1rem',
            borderRadius: '0.375rem',
            overflowX: 'auto',
            fontSize: '0.875rem',
            border: '1px solid #374151',
            margin: 0
          }}>
{`<Wave
  fill="rgba(59, 130, 246, 0.5)"
  options={{
    height: 30,
    amplitude: 30,
    speed: 0.2,
    points: 4
  }}
  emojis={{
    emojis: ['🌊', '🐠', '🐙', '🦀'],
    floatOn: 'top' // or 'middle' or 'both'
  }}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default DemoPage
