import React, { useState } from "react";

function CreatePost({ token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createPost = () => {
    if (!title || !content) return;

    setLoading(true);

    fetch("http://127.0.0.1:8000/api/posts/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   // ✅ props se aa raha hai
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Post Created Successfully 🔥");

        setTitle("");
        setContent("");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2>Create Post</h2>

      <input
        value={title}
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        placeholder="content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createPost} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}

export default CreatePost;