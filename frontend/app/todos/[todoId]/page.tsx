import Link from "next/link";
import { getTodo, updateTodo } from "../../actions";

type EditTodoPageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;
  const todo = await getTodo(todoId);

  const updateTodoWithId = updateTodo.bind(null, todoId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          Edit Todo
        </p>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Todo 수정
        </h1>

        <form action={updateTodoWithId} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              할 일
            </label>
            <input
              name="title"
              defaultValue={todo.title}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
            <input
              type="checkbox"
              name="completed"
              defaultChecked={todo.completed}
              className="h-5 w-5"
            />
            완료한 Todo로 표시하기
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
              수정 완료
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