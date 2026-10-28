import { useEffect } from 'react'
import { useLottie } from 'lottie-react'
import deliveryAnimation from '../../assets/delivery-service.json'

interface InitialLoaderProps {
  onComplete: () => void
}

// Keep in sync with the timeout below – the progress bar uses the same value.
const LOADER_DURATION_MS = 3000

const BRAND_LETTERS = 'ShopCart'.split('')

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const { View } = useLottie({
    animationData: deliveryAnimation,
    loop: false,
    autoplay: true,
  })

  useEffect(() => {
    // The animation is approximately 4 seconds long.
    const timer = window.setTimeout(onComplete, LOADER_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <main
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-white px-6"
      aria-label="Loading ShopCart"
      aria-busy="true"
    >
      {/* Scoped keyframes so no Tailwind config changes are needed */}
      <style>{`
        @keyframes sc-letter-in {
          0%   { opacity: 0; transform: translateY(0.9em) scale(0.85); filter: blur(6px); }
          60%  { opacity: 1; transform: translateY(-0.12em) scale(1.04); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes sc-wave {
          0%, 100% { color: #0f172a; transform: translateY(0); }
          50%      { color: #0d9488; transform: translateY(-0.14em); }
        }
        @keyframes sc-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sc-underline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes sc-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes sc-dot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40%           { opacity: 1;    transform: translateY(-3px); }
        }

        .sc-letter {
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity, filter;
          animation:
            sc-letter-in 700ms cubic-bezier(0.22, 1.2, 0.36, 1) calc(var(--i) * 70ms) both,
            sc-wave 800ms ease-in-out calc(1100ms + var(--i) * 80ms) both;
        }
        .sc-underline {
          transform-origin: left center;
          animation: sc-underline 600ms cubic-bezier(0.65, 0, 0.35, 1) 900ms both;
        }
        .sc-tagline {
          opacity: 0;
          animation: sc-fade-up 600ms ease-out 1000ms both;
        }
        .sc-status {
          opacity: 0;
          animation: sc-fade-up 600ms ease-out 1300ms both;
        }
        .sc-progress-fill {
          transform-origin: left center;
          animation: sc-progress ${LOADER_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .sc-dot {
          display: inline-block;
          animation: sc-dot 1.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-letter, .sc-underline, .sc-tagline, .sc-status, .sc-dot {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
          .sc-progress-fill { animation-duration: 1ms; }
        }
      `}</style>

      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          {View}
        </div>

        <h1
          className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
          aria-label="ShopCart"
        >
          {BRAND_LETTERS.map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              aria-hidden="true"
              className="sc-letter"
              style={{ ['--i' as string]: i } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </h1>

        <div
          aria-hidden="true"
          className="sc-underline mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
        />

        <p className="sc-tagline mt-3 text-sm text-slate-500">
          Delivering a better shopping experience
        </p>

        <p className="sc-status mt-3 text-xs font-medium text-slate-400" aria-live="polite">
          Preparing your store
          <span aria-hidden="true">
            <span className="sc-dot" style={{ animationDelay: '0ms' }}>.</span>
            <span className="sc-dot" style={{ animationDelay: '160ms' }}>.</span>
            <span className="sc-dot" style={{ animationDelay: '320ms' }}>.</span>
          </span>
        </p>

        {/* Progress bar synced with the onComplete timer */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-slate-100"
        >
          <div className="sc-progress-fill h-full w-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400" />
        </div>
      </div>
    </main>
  )
}