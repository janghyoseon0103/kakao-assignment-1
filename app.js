// HTML 요소 가져오기
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const message = document.getElementById("message");
const filterTabs = document.getElementById("filterTabs");
const selectedDateText = document.getElementById("selectedDateText");
const prevWeekButton = document.getElementById("prevWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");
const weekDays = document.getElementById("weekDays");

// 로컬스토리지에 저장할 때 사용할 key 이름
const TODO_STORAGE_KEY = "vanillaTodoList";

// Todo 데이터를 저장할 배열
let todos = [];

// 현재 선택된 필터 상태
// all: 전체, active: 진행 중, completed: 완료
let currentFilter = "all";

// 현재 선택된 날짜
// 처음에는 오늘 날짜로 시작
let selectedDate = new Date();

// 페이지가 처음 실행될 때 로컬스토리지에서 Todo 데이터를 불러옴
loadTodosFromLocalStorage();

// 페이지가 처음 실행될 때 날짜, 주간 뷰, Todo 목록을 화면에 표시
updateSelectedDateText();
renderWeekDays();
renderTodos();

// Todo 추가 이벤트
todoForm.addEventListener("submit", function (event) {
  // form 제출 시 페이지가 새로고침되는 기본 동작을 막음
  event.preventDefault();

  // 입력값 앞뒤 공백 제거
  const todoText = todoInput.value.trim();

  // 입력값이 비어 있으면 Todo를 만들지 않고 안내 메시지를 보여줌
  if (todoText === "") {
    showMessage("할 일을 입력한 뒤 추가 버튼을 눌러주세요.");
    return;
  }

  // 새로운 Todo 객체 생성
  // date에는 현재 선택된 날짜를 YYYY-MM-DD 형태로 저장
  const newTodo = {
    id: Date.now(),
    text: todoText,
    isCompleted: false,
    date: formatDateKey(selectedDate),
  };

  // 배열에 새로운 Todo 추가
  todos.push(newTodo);

  // Todo 배열이 변경되었으므로 로컬스토리지에 저장
  saveTodosToLocalStorage();

  // 입력창 초기화
  todoInput.value = "";

  // 안내 메시지 초기화
  showMessage("");

  // Todo 개수가 바뀌었으므로 주간 뷰와 목록을 다시 그림
  renderWeekDays();
  renderTodos();
});

// 이전 주차 버튼 클릭 이벤트
prevWeekButton.addEventListener("click", function () {
  // 선택된 날짜를 7일 전으로 이동
  selectedDate = getMovedDate(selectedDate, -7);

  // 날짜 텍스트, 주간 날짜, Todo 목록 업데이트
  updateSelectedDateText();
  renderWeekDays();
  renderTodos();
});

// 다음 주차 버튼 클릭 이벤트
nextWeekButton.addEventListener("click", function () {
  // 선택된 날짜를 7일 뒤로 이동
  selectedDate = getMovedDate(selectedDate, 7);

  // 날짜 텍스트, 주간 날짜, Todo 목록 업데이트
  updateSelectedDateText();
  renderWeekDays();
  renderTodos();
});

// 필터 탭 클릭 이벤트
filterTabs.addEventListener("click", function (event) {
  // 클릭한 요소가 필터 버튼이 아니면 함수 종료
  if (!event.target.classList.contains("filter-button")) {
    return;
  }

  // 클릭한 버튼의 data-filter 값을 현재 필터 상태로 저장
  currentFilter = event.target.dataset.filter;

  // 선택된 필터 버튼의 active 스타일 업데이트
  updateActiveFilterButton();

  // 선택된 날짜 + 상태 필터 기준으로 Todo 목록 다시 그리기
  renderTodos();
});

// 안내 메시지를 보여주는 함수
function showMessage(text) {
  message.textContent = text;
}

// Todo 배열을 로컬스토리지에 저장하는 함수
function saveTodosToLocalStorage() {
  // localStorage에는 문자열만 저장할 수 있음
  // 그래서 배열을 JSON.stringify로 문자열 형태로 변환해서 저장
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 로컬스토리지에서 Todo 배열을 불러오는 함수
function loadTodosFromLocalStorage() {
  // 저장된 Todo 문자열을 가져옴
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  // 저장된 데이터가 없다면 빈 배열 상태로 시작
  if (savedTodos === null) {
    todos = [];
    return;
  }

  // 저장된 데이터가 있다면 JSON.parse로 다시 배열 형태로 변환
  todos = JSON.parse(savedTodos);
}

// Date 객체를 Todo 저장용 날짜 문자열로 바꾸는 함수
// 예: 2026-06-02
function formatDateKey(date) {
  const year = date.getFullYear();

  // getMonth()는 0부터 시작하므로 1을 더해야 실제 월이 됨
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Date 객체를 화면 표시용 날짜 문자열로 바꾸는 함수
// 예: 2026년 6월 2일 화요일
function formatDateText(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${dayName}요일`;
}

// 선택된 날짜 텍스트를 화면에 표시하는 함수
function updateSelectedDateText() {
  selectedDateText.textContent = formatDateText(selectedDate);
}

// 현재 날짜에서 원하는 일수만큼 이동한 새 Date 객체를 반환하는 함수
function getMovedDate(date, moveDayCount) {
  const movedDate = new Date(date);

  // moveDayCount가 -7이면 이전 주, 7이면 다음 주로 이동
  movedDate.setDate(movedDate.getDate() + moveDayCount);

  return movedDate;
}

// 선택된 날짜가 포함된 주의 월요일 날짜를 구하는 함수
function getMondayOfWeek(date) {
  const copiedDate = new Date(date);

  // getDay(): 일요일 0, 월요일 1, 화요일 2, ... 토요일 6
  const day = copiedDate.getDay();

  // 월요일을 시작으로 만들기 위한 차이 계산
  // 일요일이면 -6, 월요일이면 0, 화요일이면 -1
  const diffToMonday = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + diffToMonday);

  return copiedDate;
}

// 선택된 날짜가 포함된 주의 월요일~일요일 날짜 배열을 만드는 함수
function getCurrentWeekDates() {
  const monday = getMondayOfWeek(selectedDate);
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
}

// 오늘 날짜인지 확인하는 함수
function isToday(date) {
  const today = new Date();

  return formatDateKey(date) === formatDateKey(today);
}

// 선택된 날짜인지 확인하는 함수
function isSelectedDate(date) {
  return formatDateKey(date) === formatDateKey(selectedDate);
}

// 특정 날짜에 등록된 Todo 개수를 구하는 함수
function getTodoCountByDate(date) {
  const dateKey = formatDateKey(date);

  return todos.filter(function (todo) {
    return todo.date === dateKey;
  }).length;
}

// 주간 날짜 버튼을 화면에 그리는 함수
function renderWeekDays() {
  // 기존 날짜 버튼을 비움
  weekDays.innerHTML = "";

  const weekDates = getCurrentWeekDates();
  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];

  weekDates.forEach(function (date, index) {
    const dayCard = document.createElement("button");
    dayCard.type = "button";
    dayCard.className = "day-card";

    // 오늘 날짜라면 today 클래스 추가
    if (isToday(date)) {
      dayCard.classList.add("today");
    }

    // 현재 선택된 날짜라면 selected 클래스 추가
    if (isSelectedDate(date)) {
      dayCard.classList.add("selected");
    }

    const dayName = document.createElement("span");
    dayName.className = "day-name";
    dayName.textContent = dayNames[index];

    const dayNumber = document.createElement("span");
    dayNumber.className = "day-number";
    dayNumber.textContent = date.getDate();

    const todoCount = document.createElement("span");
    todoCount.className = "todo-count";
    todoCount.textContent = `${getTodoCountByDate(date)}개`;

    // 날짜 버튼 클릭 시 해당 날짜를 선택된 날짜로 변경
    dayCard.addEventListener("click", function () {
      selectedDate = new Date(date);

      updateSelectedDateText();
      renderWeekDays();
      renderTodos();
    });

    dayCard.appendChild(dayName);
    dayCard.appendChild(dayNumber);
    dayCard.appendChild(todoCount);

    weekDays.appendChild(dayCard);
  });
}

// 현재 선택된 날짜에 해당하는 Todo만 반환하는 함수
function getTodosBySelectedDate() {
  const selectedDateKey = formatDateKey(selectedDate);

  return todos.filter(function (todo) {
    return todo.date === selectedDateKey;
  });
}

// 현재 날짜와 필터 상태에 맞는 Todo만 반환하는 함수
function getFilteredTodos() {
  // 먼저 선택된 날짜에 해당하는 Todo만 가져옴
  const todosBySelectedDate = getTodosBySelectedDate();

  // 진행 중 Todo만 반환
  if (currentFilter === "active") {
    return todosBySelectedDate.filter(function (todo) {
      return !todo.isCompleted;
    });
  }

  // 완료된 Todo만 반환
  if (currentFilter === "completed") {
    return todosBySelectedDate.filter(function (todo) {
      return todo.isCompleted;
    });
  }

  // 선택된 날짜의 전체 Todo 반환
  return todosBySelectedDate;
}

// 선택된 필터 버튼에만 active 클래스를 적용하는 함수
function updateActiveFilterButton() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach(function (button) {
    if (button.dataset.filter === currentFilter) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Todo 목록을 화면에 출력하는 함수
function renderTodos() {
  // 기존 목록을 비워 중복 렌더링을 방지
  todoList.innerHTML = "";

  // 현재 선택된 날짜와 필터 상태에 맞는 Todo만 가져옴
  const filteredTodos = getFilteredTodos();

  // 표시할 Todo가 없다면 안내 문구 출력
  if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";

    if (currentFilter === "active") {
      emptyMessage.textContent = "이 날짜에 진행 중인 Todo가 없습니다.";
    } else if (currentFilter === "completed") {
      emptyMessage.textContent = "이 날짜에 완료된 Todo가 없습니다.";
    } else {
      emptyMessage.textContent = "이 날짜에 등록된 Todo가 없습니다.";
    }

    todoList.appendChild(emptyMessage);
    return;
  }

  // 필터링된 Todo 배열을 순회하며 Todo 항목 생성
  filteredTodos.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    // 완료 상태라면 취소선 클래스 추가
    if (todo.isCompleted) {
      todoText.classList.add("completed");
    }

    const editButton = document.createElement("button");
    editButton.className = "todo-button edit-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", function () {
      editTodo(todo.id);
    });

    const completeButton = document.createElement("button");
    completeButton.className = "todo-button complete-button";
    completeButton.textContent = todo.isCompleted ? "취소" : "완료";
    completeButton.addEventListener("click", function () {
      toggleTodoComplete(todo.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-button delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    // 만든 요소들을 li 안에 추가
    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);

    // 완성된 Todo 항목을 ul에 추가
    todoList.appendChild(todoItem);
  });
}

// Todo 완료 상태를 바꾸는 함수
function toggleTodoComplete(todoId) {
  todos = todos.map(function (todo) {
    if (todo.id === todoId) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    }

    return todo;
  });

  // 완료 상태 변경 내용을 로컬스토리지에 저장
  saveTodosToLocalStorage();

  // 현재 날짜와 필터 기준으로 다시 화면을 그림
  renderWeekDays();
  renderTodos();
}

// Todo를 삭제하는 함수
function deleteTodo(todoId) {
  todos = todos.filter(function (todo) {
    return todo.id !== todoId;
  });

  // 삭제된 내용을 로컬스토리지에 저장
  saveTodosToLocalStorage();

  // Todo 개수가 바뀌었으므로 주간 뷰와 목록을 다시 그림
  renderWeekDays();
  renderTodos();
}

// Todo를 수정하는 함수
function editTodo(todoId) {
  const todoItem = findTodoById(todoId);

  if (!todoItem) {
    return;
  }

  // 수정 화면도 현재 날짜와 필터 상태를 반영해야 하므로 필터링된 Todo만 사용
  const filteredTodos = getFilteredTodos();

  // 수정할 Todo가 들어 있는 li 요소를 찾기 위해 화면을 다시 구성
  todoList.innerHTML = "";

  filteredTodos.forEach(function (todo) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    // 수정하려는 Todo라면 입력창과 저장 버튼을 보여줌
    if (todo.id === todoId) {
      const editInput = document.createElement("input");
      editInput.className = "edit-input";
      editInput.type = "text";
      editInput.value = todo.text;

      const saveButton = document.createElement("button");
      saveButton.className = "todo-button save-button";
      saveButton.textContent = "저장";

      saveButton.addEventListener("click", function () {
        saveEditedTodo(todoId, editInput.value);
      });

      listItem.appendChild(editInput);
      listItem.appendChild(saveButton);

      // 수정 입력창에 바로 커서가 가도록 설정
      setTimeout(function () {
        editInput.focus();
      }, 0);
    } else {
      const todoText = document.createElement("span");
      todoText.className = "todo-text";
      todoText.textContent = todo.text;

      if (todo.isCompleted) {
        todoText.classList.add("completed");
      }

      const editButton = document.createElement("button");
      editButton.className = "todo-button edit-button";
      editButton.textContent = "수정";
      editButton.addEventListener("click", function () {
        editTodo(todo.id);
      });

      const completeButton = document.createElement("button");
      completeButton.className = "todo-button complete-button";
      completeButton.textContent = todo.isCompleted ? "취소" : "완료";
      completeButton.addEventListener("click", function () {
        toggleTodoComplete(todo.id);
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "todo-button delete-button";
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      listItem.appendChild(todoText);
      listItem.appendChild(editButton);
      listItem.appendChild(completeButton);
      listItem.appendChild(deleteButton);
    }

    todoList.appendChild(listItem);
  });
}

// 수정한 Todo를 저장하는 함수
function saveEditedTodo(todoId, editedText) {
  const trimmedText = editedText.trim();

  // 수정 입력값이 비어 있으면 저장하지 않음
  if (trimmedText === "") {
    showMessage("수정할 내용을 비워둘 수 없습니다.");
    return;
  }

  todos = todos.map(function (todo) {
    if (todo.id === todoId) {
      return {
        ...todo,
        text: trimmedText,
      };
    }

    return todo;
  });

  // 수정된 내용을 로컬스토리지에 저장
  saveTodosToLocalStorage();

  showMessage("");

  // 수정 저장 후 현재 날짜와 필터 기준으로 다시 화면을 그림
  renderWeekDays();
  renderTodos();
}

// id로 Todo를 찾는 함수
function findTodoById(todoId) {
  return todos.find(function (todo) {
    return todo.id === todoId;
  });
}