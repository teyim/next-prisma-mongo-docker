"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../services/posts";
import { Post } from "@prisma/client";
import PostForm from "./forms/PostForm";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleSuccess = () => {
    setEditingPost(null);
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => setEditingPost(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
      <h2>{editingPost ? "Edit Post" : "Create Post"}</h2>
      <PostForm post={editingPost} onSuccess={handleSuccess} />
    </div>
  );
};

export default PostList;
