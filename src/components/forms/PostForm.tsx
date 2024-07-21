"use client";

import React, { useState } from "react";
import { createPost, updatePost } from "../../services/posts";
import { Post } from "@prisma/client";

interface PostFormProps {
  post?: Post | null;
  onSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Post>>(post || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      await updatePost(formData as Post);
    } else {
      await createPost(formData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={formData.slug || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title || ""}
        onChange={handleChange}
      />
      <textarea
        name="body"
        placeholder="Body"
        value={formData.body || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="authorId"
        placeholder="Author ID"
        value={formData.authorId || ""}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
