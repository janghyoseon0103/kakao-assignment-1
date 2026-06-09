import { formatDateText } from "../utils/date";

function DailyView({ selectedDateKey, onPrevDate, onNextDate, onGoToday }) {
  return (
    <section className="mb-6 flex items-center gap-3 rounded-3xl border border-purple-100 bg-purple-50/70 p-4 max-sm:flex-col">
      <button
        type="button"
        onClick={onPrevDate}
        className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
      >
        이전 날짜
      </button>

      <div className="flex-1 text-center">
        <p className="mb-1 text-xs font-bold text-zinc-400">선택된 날짜</p>
        <h2 className="text-xl font-extrabold text-zinc-900">
          {formatDateText(selectedDateKey)}
        </h2>
      </div>

      <button
        type="button"
        onClick={onNextDate}
        className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
      >
        다음 날짜
      </button>

      <button
        type="button"
        onClick={onGoToday}
        className="rounded-xl bg-[#672be0] px-4 py-3 text-sm font-bold text-white hover:bg-[#5723c0] max-sm:w-full"
      >
        오늘
      </button>
    </section>
  );
}

export default DailyView;