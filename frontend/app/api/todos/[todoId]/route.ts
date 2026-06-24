const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

type RouteContext = {
  params: Promise<{
    todoId: string;
  }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const { todoId } = await context.params;
  const body = await request.json();

  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data, {
    status: res.status,
  });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { todoId } = await context.params;

  const res = await fetch(`${BACKEND_URL}/todos/${todoId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return Response.json(data, {
    status: res.status,
  });
}