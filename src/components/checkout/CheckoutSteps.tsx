
export type CheckoutStepIndex = 1 | 2 | 3

const STEPS: { index: CheckoutStepIndex; label: string }[] = [
  { index: 1, label: 'Cart Review' },
  { index: 2, label: 'Shipping' },
  { index: 3, label: 'Payment' },
]

interface CheckoutStepsProps {
  currentStep: CheckoutStepIndex
}

export default function CheckoutSteps({
  currentStep,
}: CheckoutStepsProps) {
  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="flex items-center gap-2 sm:gap-4">
        {STEPS.map((step, position) => {
          const isComplete = step.index < currentStep
          const isCurrent = step.index === currentStep

          return (
            <li
              key={step.index}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex items-center gap-2 ${position < STEPS.length - 1 ? 'flex-1' : ''
                }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${isComplete
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : isCurrent
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-slate-100 text-slate-500'
                  }`}
              >
                {isComplete ? '✓' : step.index}
              </span>

              <span
                className={`hidden text-sm font-medium sm:block ${isCurrent ? 'text-slate-900' : 'text-slate-500'
                  }`}
              >
                {step.label}
              </span>

              {position < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-1 h-px flex-1 ${isComplete ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
