"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Todo } from "./types";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BACKEND_URL}/todos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Todo 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function getTodo(todoId: string): Promise<Todo> {
  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Todo를 불러오지 못했습니다.");
  }

  return res.json();
}

export async function createTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    throw new Error("Todo 내용을 입력해주세요.");
  }

  const res = await fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Todo 생성에 실패했습니다.");
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function updateTodo(todoId: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const completed = formData.get("completed") === "on";

  if (!title) {
    throw new Error("Todo 내용을 입력해주세요.");
  }

  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Todo 수정에 실패했습니다.");
  }

  revalidatePath("/todos");
  redirect("/todos");
}