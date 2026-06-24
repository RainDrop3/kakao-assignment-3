export type Todo = {
    id: number;
    todo: string;
    isComplete: boolean;
};

export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`${process.env.BACKEND_URL}/todos`, { cache: "no-store" });
    if (!res.ok) throw new Error("Todo 목록을 불러오지 못했어요");
    return res.json();
}
