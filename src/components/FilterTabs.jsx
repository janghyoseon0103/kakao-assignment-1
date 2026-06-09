const FILTER_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "진행 중", value: "active" },
  { label: "완료", value: "completed" },
];

function FilterTabs({ filterType, onChangeFilter }) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-purple-50 p-2">
      {FILTER_OPTIONS.map((filterOption) => (
        <button
          key={filterOption.value}
          type="button"
          onClick={() => onChangeFilter(filterOption.value)}
          className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
            filterType === filterOption.value
              ? "bg-[#672be0] text-white shadow-lg shadow-purple-200"
              : "text-zinc-500 hover:bg-purple-100 hover:text-[#672be0]"
          }`}
        >
          {filterOption.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;