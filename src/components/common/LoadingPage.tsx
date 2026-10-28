
export default function LoadingPage() {
  return (
    <main
      className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8"
      aria-label="Loading products"
      aria-busy="true"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 animate-pulse">
          <div className="h-4 w-40 rounded bg-indigo-100" />
          <div className="mt-4 h-9 w-64 max-w-full rounded-lg bg-slate-200" />
          <div className="mt-3 h-5 w-80 max-w-full rounded bg-slate-200" />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>

        <div className="mb-5 h-4 w-24 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
                <div className="h-28 w-28 animate-pulse rounded-xl bg-slate-200" />
              </div>

              <div className="mt-4 animate-pulse space-y-3">
                <div className="h-3 w-20 rounded bg-indigo-100" />
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="mt-5 h-10 rounded-xl bg-indigo-100" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Loading products, please wait...
        </p>
      </div>
    </main>
  )
}
