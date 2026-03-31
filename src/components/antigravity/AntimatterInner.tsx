'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Matter from 'matter-js'

const QUOTES = [
  'MAMBA', 'MENTALITY', '8', '24', 'KOBE', 'NO EXCUSES',
  'WORK', 'GRIND', 'FOCUS', 'WINNER',
]

export default function AntimatterInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const engine = Matter.Engine.create({ gravity: { x: 0, y: -0.3 } })
    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width: W,
        height: H,
        background: '#000000',
        wireframes: false,
      },
    })

    const runner = Matter.Runner.create()

    // Create floating text bodies as rectangles
    const bodies: Matter.Body[] = []
    for (let i = 0; i < 25; i++) {
      const isGold = Math.random() > 0.4
      const size = Math.random() * 30 + 20
      const body = Matter.Bodies.rectangle(
        Math.random() * W,
        Math.random() * H,
        size * 4,
        size,
        {
          restitution: 0.9,
          friction: 0.05,
          render: {
            fillStyle: isGold ? '#FFD700' : '#5A2D82',
          },
          label: QUOTES[Math.floor(Math.random() * QUOTES.length)],
        }
      )
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2)
      bodies.push(body)
    }

    // Particle balls
    for (let i = 0; i < 40; i++) {
      const isGold = Math.random() > 0.5
      const r = Math.random() * 8 + 4
      const ball = Matter.Bodies.circle(
        W / 2 + (Math.random() - 0.5) * 200,
        H / 2 + (Math.random() - 0.5) * 200,
        r,
        {
          restitution: 1,
          friction: 0,
          render: {
            fillStyle: isGold ? '#FFD700' : '#8B4FBF',
            opacity: 0.8,
          },
        }
      )
      Matter.Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
      })
      bodies.push(ball)
    }

    Matter.Composite.add(engine.world, bodies)
    Matter.Render.run(render)
    Matter.Runner.run(runner, engine)

    // Draw labels on canvas after render
    const ctx = canvas.getContext('2d')
    if (ctx) {
      Matter.Events.on(render, 'afterRender', () => {
        bodies.forEach((body) => {
          if (!body.label || body.label === 'Rectangle Body' || body.label === 'Circle Body') return
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          ctx.fillStyle = '#000000'
          ctx.font = 'bold 12px Inter, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(body.label, 0, 0)
          ctx.restore()
        })
      })
    }

    return () => {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-6xl font-black text-primary drop-shadow-lg tracking-widest">
          MAMBA
        </p>
        <p className="text-xl font-light text-white/60 mt-2">MENTALITY</p>
        <p className="text-sm text-white/40 mt-8">8 · 24 · Forever</p>
      </div>

      {/* Exit button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 right-4 rounded-full border border-white/20 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/40 transition-colors"
      >
        Salir ✕
      </button>

      {/* Trigger hint */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/20">
        Escribí &quot;mamba&quot; en cualquier página para activar esto
      </p>
    </div>
  )
}
