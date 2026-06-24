"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTodoPage() {
  const [todo, setTodo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return; 
    await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo, isComplete: false }),
    });
    router.push("/todos");
    router.refresh();
  };

  return (
    <main className="mx-auto w-full max-w-md p-8">
      <h1 className="mb-6 text-2xl font-semibold">새 Todo</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="rounded border px-3 py-2"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            추가
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
