import { useState } from "react";

function TodoItem({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  const [editValue, setEditValue] = useState(todo.text);

  function handleSaveEdit() {
    onSaveEdit(todo.id, editValue);
  }

  function handleCancelEdit() {
    setEditValue(todo.text);
    onCancelEdit(todo.id);
  }

  if (todo.isEditing) {
    return (
      <li className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-[#fbfaff] p-4 max-sm:flex-col">
        <input
          type="text"
          value={editValue}
          onChange={(event) => setEditValue(event.target.value)}
          className="flex-1 rounded-xl border border-purple-100 px-4 py-3 text-sm outline-none focus:border-[#672be0] focus:ring-4 focus:ring-purple-100 max-sm:w-full"
        />

        <button
          type="button"
          onClick={handleSaveEdit}
          className="rounded-xl bg-[#672be0] px-4 py-3 text-sm font-bold text-white hover:bg-[#5723c0] max-sm:w-full"
        >
          저장
        </button>

        <button
          type="button"
          onClick={handleCancelEdit}
          className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-200 max-sm:w-full"
        >
          취소
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-[#fbfaff] p-4 max-sm:flex-col max-sm:items-stretch">
      <span
        className={`flex-1 text-sm ${
          todo.isCompleted ? "text-zinc-400 line-through" : "text-zinc-900"
        }`}
      >
        {todo.text}
      </span>

      <button
        type="button"
        onClick={() => onStartEdit(todo.id)}
        className="rounded-xl bg-purple-100 px-4 py-2 text-xs font-bold text-[#672be0] hover:bg-purple-200"
      >
        수정
      </button>

      <button
        type="button"
        onClick={() => onToggleComplete(todo.id)}
        className="rounded-xl bg-green-100 px-4 py-2 text-xs font-bold text-green-700 hover:bg-green-200"
      >
        {todo.isCompleted ? "취소" : "완료"}
      </button>

      <button
        type="button"
        onClick={() => onDeleteTodo(todo.id)}
        className="rounded-xl bg-red-100 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-200"
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;