"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="mb-2 text-sm font-semibold text-rose-600">
          Error
        </p>

        <h1 className="mb-4 text-2xl font-bold text-slate-900">
          오류가 발생했습니다.
        </h1>

        <p className="mb-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
          {error.message}
        </p>

        <button
          onClick={reset}
          className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          다시 시도
        </button>
      </section>
    </main>
  );
}