import PostList from "@/components/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="py-5">
        <h1>Blog</h1>
        <PostList />
      </div>
      <div className="py-6">
        <h1>Users</h1>
      </div>
      <div className="py-6">
        <h1>Comments</h1>
      </div>
    </main>
  );
}
