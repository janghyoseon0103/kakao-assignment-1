import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onAddTodo(inputValue);
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3 flex gap-3 max-sm:flex-col">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1 rounded-2xl border border-purple-100 px-4 py-4 text-sm outline-none focus:border-[#672be0] focus:ring-4 focus:ring-purple-100"
      />

      <button
        type="submit"
        className="rounded-2xl bg-[#672be0] px-6 py-4 text-sm font-bold text-white hover:bg-[#5723c0]"
      >
        추가
      </button>
    </form>
  );
}

export default TodoForm;