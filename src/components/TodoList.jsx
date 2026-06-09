import TodoItem from "./TodoItem";

function TodoList({
  todos,
  filterType,
  onToggleComplete,
  onDeleteTodo,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  function getEmptyMessage() {
    if (filterType === "active") {
      return "이 날짜에 진행 중인 Todo가 없습니다.";
    }

    if (filterType === "completed") {
      return "이 날짜에 완료된 Todo가 없습니다.";
    }

    return "이 날짜에 등록된 Todo가 없습니다.";
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-purple-200 bg-[#fbfaff] p-8 text-center text-sm text-zinc-400">
        {getEmptyMessage()}
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;