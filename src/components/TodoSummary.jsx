function TodoSummary({ totalCount, activeCount, completedCount, onDeleteCompleted }) {
  return (
    <section className="mb-6 grid grid-cols-4 gap-3 max-md:grid-cols-2">
      <div className="rounded-2xl bg-purple-50 p-4 text-center">
        <p className="text-xs font-bold text-zinc-400">전체</p>
        <p className="mt-1 text-2xl font-extrabold text-[#672be0]">
          {totalCount}
        </p>
      </div>

      <div className="rounded-2xl bg-purple-50 p-4 text-center">
        <p className="text-xs font-bold text-zinc-400">진행 중</p>
        <p className="mt-1 text-2xl font-extrabold text-[#672be0]">
          {activeCount}
        </p>
      </div>

      <div className="rounded-2xl bg-purple-50 p-4 text-center">
        <p className="text-xs font-bold text-zinc-400">완료</p>
        <p className="mt-1 text-2xl font-extrabold text-[#672be0]">
          {completedCount}
        </p>
      </div>

      <button
        type="button"
        onClick={onDeleteCompleted}
        disabled={completedCount === 0}
        className={`rounded-2xl p-4 text-sm font-bold transition ${
          completedCount === 0
            ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
            : "bg-red-100 text-red-600 hover:bg-red-200"
        }`}
      >
        완료 Todo
        <br />
        모두 삭제
      </button>
    </section>
  );
}

export default TodoSummary;