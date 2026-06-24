import Link from "next/link";
import { createTodo } from "../../actions";

export default function NewTodoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          Create Todo
        </p>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          새 Todo 만들기
        </h1>

        <form action={createTodo} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              할 일
            </label>
            <input
              name="title"
              placeholder="예: Next.js 과제 마무리하기"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
              저장
            </button>

            <Link
              href="/todos"
              className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              취소
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}