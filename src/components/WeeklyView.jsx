import {
  getDateNumber,
  getWeekDateKeys,
  isToday,
  moveDateKey,
} from "../utils/date";

const DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

function WeeklyView({
  todos,
  selectedDateKey,
  weekStartDateKey,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
}) {
  const weekDateKeys = getWeekDateKeys(weekStartDateKey);
  const weekEndDateKey = moveDateKey(weekStartDateKey, 6);

  function getTodoCountByDate(dateKey) {
    return todos.filter((todo) => todo.date === dateKey).length;
  }

  return (
    <section className="mb-6 rounded-3xl border border-purple-100 bg-[#fbfaff] p-4">
      <div className="mb-4 flex items-center justify-between gap-3 max-sm:flex-col">
        <button
          type="button"
          onClick={onPrevWeek}
          className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
        >
          이전 주차
        </button>

        <p className="text-center text-sm font-bold text-zinc-600">
          {weekStartDateKey} ~ {weekEndDateKey}
        </p>

        <button
          type="button"
          onClick={onNextWeek}
          className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
        >
          다음 주차
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 overflow-x-auto">
        {weekDateKeys.map((dateKey, index) => {
          const isSelected = selectedDateKey === dateKey;
          const today = isToday(dateKey);

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={`min-w-20 rounded-2xl border p-3 text-center transition ${
                isSelected
                  ? "border-[#672be0] bg-[#672be0] text-white shadow-lg shadow-purple-200"
                  : "border-purple-100 bg-white text-zinc-700 hover:border-[#672be0]"
              } ${today && !isSelected ? "ring-2 ring-[#672be0]" : ""}`}
            >
              <span
                className={`block text-xs font-bold ${
                  isSelected ? "text-purple-100" : "text-zinc-400"
                }`}
              >
                {DAY_NAMES[index]}
              </span>

              <span className="mt-1 block text-xl font-extrabold">
                {getDateNumber(dateKey)}
              </span>

              <span
                className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-bold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-purple-50 text-[#672be0]"
                }`}
              >
                {getTodoCountByDate(dateKey)}개
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default WeeklyView;