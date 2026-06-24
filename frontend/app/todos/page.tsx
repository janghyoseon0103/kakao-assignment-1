import Link from "next/link";
import { getTodos } from "../actions";
import TodoList from "./TodoList";

export default async function TodosPage() {
  const todos = await getTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-indigo-600">
                My Todo List
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Todo 목록
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                전체 {totalCount}개 중 {completedCount}개 완료
              </p>
            </div>

            <Link
              href="/todos/new"
              className="rounded-full bg-indigo-600 px-5 py-3 text-center font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
              + 새 Todo
            </Link>
          </div>
        </div>

        <TodoList todos={todos} />
      </section>
    </main>
  );
}