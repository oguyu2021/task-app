import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl space-y-4 p-6">
        <TaskCard 
          title="Next.jsを学習する"
          dueDate="2026/7/10"
          completed={false}
        />
        <TaskCard
          title="GitHubへPush"
          dueDate="2026/06/30"
          completed={true}
        />
      </section>
    </main>
  );
}