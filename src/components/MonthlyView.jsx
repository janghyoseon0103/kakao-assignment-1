import {
  formatMonthText,
  getDateNumber,
  getMonthCalendarDateKeys,
  isSameMonth,
  isToday,
} from "../utils/date";

const DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

function MonthlyView({
  todos,
  selectedDateKey,
  monthStartDateKey,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) {
  const calendarDateKeys = getMonthCalendarDateKeys(monthStartDateKey);

  function getTodoCountByDate(dateKey) {
    return todos.filter((todo) => todo.date === dateKey).length;
  }

  return (
    <section className="mb-6 rounded-3xl border border-purple-100 bg-[#fbfaff] p-4">
      <div className="mb-5 flex items-center justify-between gap-3 max-sm:flex-col">
        <button
          type="button"
          onClick={onPrevMonth}
          className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
        >
          이전 달
        </button>

        <h2 className="text-xl font-extrabold text-zinc-900">
          {formatMonthText(monthStartDateKey)}
        </h2>

        <button
          type="button"
          onClick={onNextMonth}
          className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-bold text-[#672be0] hover:bg-purple-200 max-sm:w-full"
        >
          다음 달
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {DAY_NAMES.map((dayName) => (
          <div
            key={dayName}
            className="py-2 text-center text-xs font-bold text-zinc-400"
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDateKeys.map((dateKey) => {
          const isSelected = selectedDateKey === dateKey;
          const today = isToday(dateKey);
          const sameMonth = isSameMonth(dateKey, monthStartDateKey);
          const todoCount = getTodoCountByDate(dateKey);

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={`min-h-24 rounded-2xl border p-2 text-left transition max-sm:min-h-20 ${
                isSelected
                  ? "border-[#672be0] bg-[#672be0] text-white shadow-lg shadow-purple-200"
                  : "border-purple-100 bg-white text-zinc-700 hover:border-[#672be0]"
              } ${today && !isSelected ? "ring-2 ring-[#672be0]" : ""} ${
                !sameMonth && !isSelected ? "opacity-35" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold">
                  {getDateNumber(dateKey)}
                </span>

                {today && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 text-[#672be0]"
                    }`}
                  >
                    오늘
                  </span>
                )}
              </div>

              <div className="mt-4 max-sm:mt-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-purple-50 text-[#672be0]"
                  }`}
                >
                  {todoCount}개
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MonthlyView;