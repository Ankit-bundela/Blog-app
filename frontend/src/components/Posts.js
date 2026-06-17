import React, { useEffect, useState } from "react";
import "./Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then(res => res.json())
      .then(data => {
        setPosts(data.msg);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">📚 Blog Posts</h1>

      {posts.length > 0 ? (
        <div className="grid">
          {posts.map((p) => (
            <div key={p.id} className="card">
              <h2 className="post-title">{p.title}</h2>
              <p className="post-content">{p.content}</p>

              <div className="footer">
                <span>🆔 {p.id}</span>
                <span>👤 Author {p.author}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No posts found 😢</p>
      )}
    </div>
  );
}

export default Posts;   