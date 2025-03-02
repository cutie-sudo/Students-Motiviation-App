import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import './Student.css'; 

const Student = () => {
  const [profile, setProfile] = useState({ name: "", email: "", bio: "" });
  const [subscribedCategories, setSubscribedCategories] = useState([]);
  const [comment, setComment] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [contentComments, setContentComments] = useState({});
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/content", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setError("Failed to fetch contents. Please try again later.");
    }
  };

  const handleCreateProfile = async () => {
    if (!profile.name || !profile.email) {
      setError("Name and email are required to create a profile.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...profile, username: profile.name }),
      });
      if (response.ok) {
        console.log("Profile created:", profile);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile. Please try again later.");
    }
  };

  const handleSubscribeCategory = async (category) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });
      if (response.ok) {
        setSubscribedCategories((prev) => [...new Set([...prev, category])]);
        console.log("Subscribed to category:", category);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error subscribing to category:", error);
      setError("Failed to subscribe to category. Please try again later.");
    }
  };

  const handleComment = async (contentId) => {
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (response.ok) {
        console.log("Comment added:", comment);
        setContentComments((prev) => ({
          ...prev,
          [contentId]: [...(prev[contentId] || []), comment],
        }));
        setComment("");
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again later.");
    }
  };

  const handleAddToWishlist = async (content) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setWishlist((prev) => [...new Set([...prev, content])]);
        console.log("Added to wishlist:", content);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add to wishlist. Please try again later.");
    }
  };

  const handleLikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/like`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Liked content ID:", contentId);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error liking content:", error);
      setError("Failed to like content. Please try again later.");
    }
  };

  const handleDislikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/dislike`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Disliked content ID:", contentId);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error disliking content:", error);
      setError("Failed to dislike content. Please try again later.");
    }
  };

  const handleViewContent = (link) => {
    console.log("Viewing content link:", link);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>TechElevate</h1>
        <p>Get inspired by the Moringa School community. Access verified tech content, expert interviews, and success stories.</p>
      </header>

      <nav className="nav">
        <button className="nav-button active">All</button>
        <button className="nav-button">DevOps</button>
        <button className="nav-button">Full Stack</button>
        <button className="nav-button">Front-End</button>
        <button className="nav-button">Backend</button>
      </nav>

      {error && <div className="error">{error}</div>}

      <div className="content-section">
        {/* Recommended Content Section */}
        <section className="recommended-content">
          {contents.map((content) => (
            <Card key={content.id} className="content-card">
              <CardContent>
                <div className="content-header">
                  <input type="checkbox" className="content-checkbox" />
                  <h3 className="content-title">{content.title}</h3>
                </div>
                <p className="content-description">{content.description}</p>
                <div className="content-footer">
                  <span className="content-author">By {content.author}</span>
                  <span className="content-type">
                    {content.content_type === "video" && <span className="icon-video">Video</span>}
                    {content.content_type === "article" && <span className="icon-article">Article</span>}
                    {content.content_type === "podcast" && <span className="icon-podcast">Podcast</span>}
                  </span>
                  <span className="content-duration">{content.duration}</span>
                </div>
                <div className="content-actions">
                  <Button onClick={() => handleLikeContent(content.id)} className="button button-green">Like</Button>
                  <Button onClick={() => handleDislikeContent(content.id)} className="button button-red">Dislike</Button>
                  <Button onClick={() => handleAddToWishlist(content.title)} className="button button-purple">Wishlist</Button>
                  <Button onClick={() => handleSubscribeCategory(content.category)} className="button button-yellow">Subscribe</Button>
                  <Button onClick={() => handleViewContent(content.content_link)} className="button button-blue">
                    {content.content_type === "video" && "Watch"}
                    {content.content_type === "podcast" && "Listen"}
                    {content.content_type === "note" && "Read"}
                  </Button>
                </div>
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={() => handleComment(content.id)}
                    className="button comment-button"
                  >
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Student;
