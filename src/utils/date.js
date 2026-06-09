// Date 객체를 YYYY-MM-DD 문자열로 변환
export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// YYYY-MM-DD 문자열을 Date 객체로 변환
export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day);
}

// 화면에 보여줄 날짜 형식
export function formatDateText(dateKey) {
  const date = parseDateKey(dateKey);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${dayName}요일`;
}

// 날짜를 원하는 일수만큼 이동
export function moveDateKey(dateKey, moveDayCount) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + moveDayCount);

  return formatDateKey(date);
}

// 오늘 날짜인지 확인
export function isToday(dateKey) {
  return dateKey === formatDateKey(new Date());
}

// 날짜 숫자만 가져오기
export function getDateNumber(dateKey) {
  return parseDateKey(dateKey).getDate();
}

// 해당 날짜가 속한 달의 1일을 YYYY-MM-DD 형태로 반환
export function getMonthStartKey(dateKey) {
  const date = parseDateKey(dateKey);

  return formatDateKey(new Date(date.getFullYear(), date.getMonth(), 1));
}

// 이전 달 또는 다음 달로 이동
export function moveMonthKey(monthStartDateKey, moveMonthCount) {
  const date = parseDateKey(monthStartDateKey);

  date.setMonth(date.getMonth() + moveMonthCount);

  return formatDateKey(new Date(date.getFullYear(), date.getMonth(), 1));
}

// 화면에 보여줄 월 텍스트
export function formatMonthText(monthStartDateKey) {
  const date = parseDateKey(monthStartDateKey);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}년 ${month}월`;
}

// 월간 달력에 표시할 날짜 배열 생성
export function getMonthCalendarDateKeys(monthStartDateKey) {
  const monthStartDate = parseDateKey(monthStartDateKey);

  const year = monthStartDate.getFullYear();
  const month = monthStartDate.getMonth();

  // 이번 달 1일
  const firstDateOfMonth = new Date(year, month, 1);

  // 이번 달 마지막 날
  const lastDateOfMonth = new Date(year, month + 1, 0);

  // 달력 시작 날짜 계산: 월요일 시작 기준
  const firstDay = firstDateOfMonth.getDay();
  const diffToMonday = firstDay === 0 ? -6 : 1 - firstDay;

  const calendarStartDate = new Date(firstDateOfMonth);
  calendarStartDate.setDate(firstDateOfMonth.getDate() + diffToMonday);

  // 달력 종료 날짜 계산: 일요일 끝 기준
  const lastDay = lastDateOfMonth.getDay();
  const diffToSunday = lastDay === 0 ? 0 : 7 - lastDay;

  const calendarEndDate = new Date(lastDateOfMonth);
  calendarEndDate.setDate(lastDateOfMonth.getDate() + diffToSunday);

  const calendarDateKeys = [];
  const currentDate = new Date(calendarStartDate);

  while (currentDate <= calendarEndDate) {
    calendarDateKeys.push(formatDateKey(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendarDateKeys;
}

// 해당 날짜가 현재 보고 있는 월에 포함되는지 확인
export function isSameMonth(dateKey, monthStartDateKey) {
  const date = parseDateKey(dateKey);
  const monthStartDate = parseDateKey(monthStartDateKey);

  return (
    date.getFullYear() === monthStartDate.getFullYear() &&
    date.getMonth() === monthStartDate.getMonth()
  );
}