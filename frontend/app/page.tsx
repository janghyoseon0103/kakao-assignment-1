import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl bg-white/80 p-10 text-center shadow-xl ring-1 ring-slate-200 backdrop-blur">
        <span className="mb-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          Next.js + FastAPI
        </span>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Todo 앱
        </h1>

        <p className="mb-8 max-w-xl text-slate-600">
          Next.js App Router와 FastAPI CRUD API를 연결해서 만든 Todo 관리 앱입니다.
        </p>

        <Link
          href="/todos"
          className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700"
        >
          Todo 목록 보러가기
        </Link>
      </section>
    </main>
  );
}