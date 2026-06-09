import { useEffect, useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterTabs from "./components/FilterTabs";
import DailyView from "./components/DailyView";
import MonthlyView from "./components/MonthlyView";
import TodoSummary from "./components/TodoSummary";
import {
  formatDateKey,
  getMonthStartKey,
  moveDateKey,
  moveMonthKey,
} from "./utils/date";

const TODO_STORAGE_KEY = "reactTodoList";
const SELECTED_DATE_STORAGE_KEY = "reactTodoSelectedDate";
const MONTH_START_STORAGE_KEY = "reactTodoMonthStartDate";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [message, setMessage] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [selectedDateKey, setSelectedDateKey] = useState(() => {
    const savedDate = localStorage.getItem(SELECTED_DATE_STORAGE_KEY);
    return savedDate || formatDateKey(new Date());
  });

  const [monthStartDateKey, setMonthStartDateKey] = useState(() => {
    const savedMonthStartDate = localStorage.getItem(MONTH_START_STORAGE_KEY);

    if (savedMonthStartDate) {
      return savedMonthStartDate;
    }

    return getMonthStartKey(formatDateKey(new Date()));
  });

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(SELECTED_DATE_STORAGE_KEY, selectedDateKey);
  }, [selectedDateKey]);

  useEffect(() => {
    localStorage.setItem(MONTH_START_STORAGE_KEY, monthStartDateKey);
  }, [monthStartDateKey]);

  function handleAddTodo(inputValue) {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setMessage("할 일을 입력한 뒤 추가 버튼을 눌러주세요.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedValue,
      isCompleted: false,
      isEditing: false,
      date: selectedDateKey,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setMessage("");
  }

  function handleToggleComplete(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      ),
    );
  }

  function handleDeleteTodo(todoId) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  }

  function handleStartEdit(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isEditing: true } : todo,
      ),
    );
  }

  function handleSaveEdit(todoId, editedText) {
    const trimmedText = editedText.trim();

    if (trimmedText === "") {
      setMessage("수정할 내용을 비워둘 수 없습니다.");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, text: trimmedText, isEditing: false }
          : todo,
      ),
    );

    setMessage("");
  }

  function handleCancelEdit(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isEditing: false } : todo,
      ),
    );
  }

  function handlePrevDate() {
    const movedDateKey = moveDateKey(selectedDateKey, -1);

    setSelectedDateKey(movedDateKey);
    setMonthStartDateKey(getMonthStartKey(movedDateKey));
  }

  function handleNextDate() {
    const movedDateKey = moveDateKey(selectedDateKey, 1);

    setSelectedDateKey(movedDateKey);
    setMonthStartDateKey(getMonthStartKey(movedDateKey));
  }

  function handlePrevMonth() {
    const movedMonthStartDateKey = moveMonthKey(monthStartDateKey, -1);

    setMonthStartDateKey(movedMonthStartDateKey);
    setSelectedDateKey(movedMonthStartDateKey);
  }

  function handleNextMonth() {
    const movedMonthStartDateKey = moveMonthKey(monthStartDateKey, 1);

    setMonthStartDateKey(movedMonthStartDateKey);
    setSelectedDateKey(movedMonthStartDateKey);
  }

  function handleSelectDate(dateKey) {
    setSelectedDateKey(dateKey);
    setMonthStartDateKey(getMonthStartKey(dateKey));
  }

  // 오늘 날짜로 바로 이동하는 함수
  function handleGoToday() {
    const todayKey = formatDateKey(new Date());

    setSelectedDateKey(todayKey);
    setMonthStartDateKey(getMonthStartKey(todayKey));
  }

  // 현재 선택된 날짜의 완료 Todo만 한 번에 삭제하는 함수
  function handleDeleteCompletedTodos() {
    setTodos((prevTodos) =>
      prevTodos.filter(
        (todo) => !(todo.date === selectedDateKey && todo.isCompleted),
      ),
    );
  }

  // 선택된 날짜에 해당하는 Todo만 계산
  const selectedDateTodos = useMemo(() => {
    return todos.filter((todo) => todo.date === selectedDateKey);
  }, [todos, selectedDateKey]);

  // 선택된 날짜의 Todo 개수 요약
  const todoSummary = useMemo(() => {
    const totalCount = selectedDateTodos.length;
    const completedCount = selectedDateTodos.filter(
      (todo) => todo.isCompleted,
    ).length;
    const activeCount = totalCount - completedCount;

    return {
      totalCount,
      activeCount,
      completedCount,
    };
  }, [selectedDateTodos]);

  // 선택된 날짜 + 필터 상태에 맞는 Todo만 계산
  const filteredTodos = useMemo(() => {
    return selectedDateTodos.filter((todo) => {
      if (filterType === "active") {
        return !todo.isCompleted;
      }

      if (filterType === "completed") {
        return todo.isCompleted;
      }

      return true;
    });
  }, [selectedDateTodos, filterType]);

  return (
    <main className="min-h-screen px-5 py-12">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl shadow-purple-200/60">
        <header className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-widest text-[#672be0]">
            PRODUCTIVITY
          </p>
          <h1 className="text-4xl font-extrabold text-zinc-950">Todo List</h1>
          <p className="mt-3 text-sm text-zinc-500">
            React로 날짜별 할 일을 추가하고 관리하는 Todo 앱입니다.
          </p>
        </header>

        <MonthlyView
          todos={todos}
          selectedDateKey={selectedDateKey}
          monthStartDateKey={monthStartDateKey}
          onSelectDate={handleSelectDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <DailyView
          selectedDateKey={selectedDateKey}
          onPrevDate={handlePrevDate}
          onNextDate={handleNextDate}
          onGoToday={handleGoToday}
        />

        <TodoSummary
          totalCount={todoSummary.totalCount}
          activeCount={todoSummary.activeCount}
          completedCount={todoSummary.completedCount}
          onDeleteCompleted={handleDeleteCompletedTodos}
        />

        <TodoForm onAddTodo={handleAddTodo} />

        <p className="min-h-6 text-sm text-red-500">{message}</p>

        <FilterTabs filterType={filterType} onChangeFilter={setFilterType} />

        <TodoList
          todos={filteredTodos}
          filterType={filterType}
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      </section>
    </main>
  );
}

export default App;