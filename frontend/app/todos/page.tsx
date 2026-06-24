import Link from "next/link";
import { getTodos } from "@/app/actions";
import DeleteButton from "./DeleteButton";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="mx-auto w-full max-w-md p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Todo 목록</h1>
        <Link href="/todos/new" className="rounded bg-black px-4 py-2 text-white">
          새 Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="text-zinc-500">할 일이 없어요. 새 Todo를 추가해보세요.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span className={t.isComplete ? "line-through text-zinc-400" : ""}>
                {t.todo}
              </span>
              <div className="flex gap-3">
                <Link
                  href={`/todos/${t.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  수정
                </Link>
                <DeleteButton id={t.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
