export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-6 py-10">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="animate-pulse text-slate-500">
          Todo를 불러오는 중입니다...
        </p>
      </section>
    </main>
  );
}