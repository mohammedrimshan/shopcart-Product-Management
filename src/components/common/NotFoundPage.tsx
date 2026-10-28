
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        <p className="text-8xl font-extrabold tracking-tight text-indigo-600">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          Sorry, we couldn't find the page you're looking for. It may have
          been moved or the URL may be incorrect.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to Shop
        </Link>
      </section>
    </main>
  )
}
