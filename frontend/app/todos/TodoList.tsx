"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Todo } from "../types";

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  const router = useRouter();

  async function toggleTodo(todo: Todo) {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    router.refresh();
  }

  async function deleteTodo(todoId: number) {
    const ok = window.confirm("정말 삭제할까요?");

    if (!ok) return;

    await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-md ring-1 ring-slate-200">
        <p className="text-lg font-semibold text-slate-800">
          아직 Todo가 없습니다.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          새 Todo를 추가해서 할 일을 관리해보세요.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTodo(todo)}
                className={
                  todo.completed
                    ? "rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700"
                    : "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600"
                }
              >
                {todo.completed ? "완료" : "미완료"}
              </button>

              <span
                className={
                  todo.completed
                    ? "text-lg font-medium text-slate-400 line-through"
                    : "text-lg font-medium text-slate-900"
                }
              >
                {todo.title}
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/todos/${todo.id}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                수정
              </Link>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}