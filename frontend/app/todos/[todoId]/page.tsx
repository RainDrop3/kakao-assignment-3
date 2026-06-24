"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Todo } from "@/app/actions";

export default function EditTodoPage() {
  const { todoId } = useParams<{ todoId: string }>();
  const router = useRouter();

  const [todo, setTodo] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // 기존 Todo 값을 불러와 폼 초기값으로 채우기
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/todos");
      const todos: Todo[] = await res.json();
      const current = todos.find((t) => String(t.id) === todoId);
      if (current) {
        setTodo(current.todo);
        setIsComplete(current.isComplete);
      }
    };
    load();
  }, [todoId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, isComplete }),
    });

    router.push("/todos");
    router.refresh();
  };

  return (
    <main className="mx-auto w-full max-w-md p-8">
      <h1 className="mb-6 text-2xl font-semibold">Todo 수정 (#{todoId})</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="rounded border px-3 py-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          완료
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => router.push("/todos")}
            className="rounded border px-4 py-2"
          >
            취소
          </button>
        </div>
      </form>
    </main>
  );
}
