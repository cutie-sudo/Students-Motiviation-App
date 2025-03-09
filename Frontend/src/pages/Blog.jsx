import { useState, useEffect } from "react";
import "./BlogPage.css";

const API_URL = "https://backend-student-motivation-app-4.onrender.com";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
      
      const commentsData = await Promise.all(data.map((post) => fetchComments(post.id)));
      const commentsObj = Object.fromEntries(commentsData);
      setComments(commentsObj);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/comments`);
      const data = await res.json();
      return [postId, data];
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      return [postId, []];
    }
  };

  const handleCommentChange = (postId, value) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment[postId] || newComment[postId].trim() === "") return;

    try {
      await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment[postId], post_id: postId }),
      });
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLike = (postId) => {
    setLikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
  };

  const handleDislike = (postId) => {
    setDislikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
  };

  const handleWishlist = (postId) => {
    setWishlist((prev) => [...prev, postId]);
  };

  const handleSubscribe = (postId) => {
    setSubscriptions((prev) => [...prev, postId]);
  };

  return (
    <div className="blog-container">
      <h1 className="page-title">Blog Posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>Like ({likes[post.id] || 0})</button>
              <button onClick={() => handleDislike(post.id)}>Dislike ({dislikes[post.id] || 0})</button>
              <button onClick={() => handleWishlist(post.id)}>Add to Wishlist</button>
              <button onClick={() => handleSubscribe(post.id)}>Subscribe</button>
            </div>
            
            <div className="comment-actions">
              <input
                type="text"
                value={newComment[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
            </div>
            
            <div className="comments-section">
              {comments[post.id]?.map((comment) => (
                <div key={comment.id} className="comment-item">
                  {editingCommentId === comment.id ? (
                    <input
                      type="text"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      onBlur={() => handleCommentEdit(post.id, comment.id)}
                    />
                  ) : (
                    <p>{comment.content}</p>
                  )}
                  <button onClick={() => { setEditingCommentId(comment.id); setEditingCommentText(comment.content); }}>Edit</button>
                  <button onClick={() => handleCommentDelete(post.id, comment.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
