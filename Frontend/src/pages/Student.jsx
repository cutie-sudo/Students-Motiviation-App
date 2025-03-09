import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./Student.css";

const Student = () => {
  const [profile, setProfile] = useState({ name: "", email: "", bio: "" });
  const [subscribedCategories, setSubscribedCategories] = useState([]);
  const [comment, setComment] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [contentComments, setContentComments] = useState({});
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalContentLink, setModalContentLink] = useState("");
  const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem("likes")) || {});
  const [dislikes, setDislikes] = useState(() => JSON.parse(localStorage.getItem("dislikes")) || {});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchContents();
    } else {
      setError("Authentication token is missing. Please log in.");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("dislikes", JSON.stringify(dislikes));
  }, [likes, dislikes]);


  const fetchCategories = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/categories", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch categories");
      setCategories(await response.json());
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/content", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch contents");
      setContents(await response.json());
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProfile = async () => {
    if (!profile.name || !profile.email) {
      setError("Name and email are required to create a profile.");
      return;
    }
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...profile, username: profile.name }),
      });
      if (response.ok) {
        console.log("Profile created:", profile);
        setError(null);
        setSuccess("Profile created successfully!");
        setTimeout(() => setSuccess(""), 3000);
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
      if (subscribedCategories.includes(category)) {
        setError(`Already subscribed to ${category}`);
        return;
      }
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });
      if (response.ok) {
        setSubscribedCategories((prev) => [...prev, category]);
        setSuccess(`Subscribed to ${category}!`);
        setTimeout(() => setSuccess(""), 3000);
        setError(null);
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
      const response = await fetch(`https://backend-student-motivation-app-4.onrender.com/content/${contentId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (response.ok) {
        setContentComments((prev) => ({
          ...prev,
          [contentId]: [
            ...(prev[contentId] || []),
            { id: Date.now(), text: comment },
          ],
        }));
        setSuccess("Comment added!");
        setTimeout(() => setSuccess(""), 3000);
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

  const handleAddToWishlist = async (contentId, contentTitle) => {
    try {
      // Check if the content is already in the wishlist
      if (wishlist.includes(contentTitle)) {
        setError("Content already in wishlist");
        return;
      }
  
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: contentId }),
      });
  
      const responseData = await response.json().catch(() => null);
  
      if (!response.ok) {
        throw new Error(responseData?.message || "Failed to add to wishlist.");
      }
  
      // Update wishlist state
      setWishlist((prev) => [...prev, contentTitle]);
      setSuccess("Added to wishlist!");
      setError(null);
  
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError(error.message || "Failed to add to wishlist. Please try again later.");
    }
  };
  

  const handleLikeContent = (contentId) => {
    setLikes((prev) => {
      const updatedLikes = { ...prev, [contentId]: (prev[contentId] || 0) + 1 };
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const handleDislikeContent = (contentId) => {
    setDislikes((prev) => {
      const updatedDislikes = { ...prev, [contentId]: Math.max(0, (prev[contentId] || 0) + 1) };
      localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
      return updatedDislikes;
    });
  };

  const handleViewContent = (link) => {
    setModalContentLink(link);
    setShowModal(true);
  };

  const handleConfirmView = () => {
    if (modalContentLink) {
      window.open(modalContentLink, "_blank", "noopener,noreferrer");
    }
    setShowModal(false);
    setModalContentLink("");
  };

  const handleCancelView = () => {
    setShowModal(false);
    setModalContentLink("");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  console.log(contents)
  const filteredContents =
    selectedCategory === "All"
      ? contents
      : contents.filter(
          (item) =>
            item.title &&
            item.title.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="container">
      <header className="header">
        <h1>Student Dashboard</h1>
        <p>
          Get inspired by the Moringa School community. Access verified tech content, expert interviews, and success stories.
        </p>
      </header>
      <nav className="nav">
        <button
          className={`nav-button ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`nav-button ${
              selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </nav>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/profile" className="profile-button">
          My Profile
        </Link>
      </div>
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      <div className="content-section">
        {filteredContents.map((content) => (
          <Card key={content.id} className="recommended-content">
            <CardContent>
              <h3 className="content-title">{content.title}</h3>
              {content.summary ? (
                <p className="content-summary">{content.summary}</p>
              ) : (
                <p className="content-description">{content.description}</p>
              )}
              {content.author && (
                <div className="content-author">
                  <strong>Author:</strong> {content.author}
                </div>
              )}
              <div className="content-footer">
                <span className="content-type">{content.content_type}</span>
                {content.duration && (
                  <span className="content-duration">Duration: {content.duration}</span>
                )}
              </div>
              <div className="content-actions">
                <Button onClick={() => handleLikeContent(content.id)} className="button button-green">
                  Like ({likes[content.id] || 0})
                </Button>
                <Button onClick={() => handleDislikeContent(content.id)} className="button button-red">
                  Dislike ({dislikes[content.id] || 0})
                </Button>
                <Button onClick={() => handleAddToWishlist(content.id, content.title)} className="button button-purple">
                  Wishlist
                </Button>
                <Button onClick={() => handleSubscribeCategory(content.category)} className="button button-yellow">
                  Subscribe
                </Button>
                <Button onClick={() => handleViewContent(content.content_link)} className="button button-blue">
                  {content.content_type === "video"
                    ? "Watch"
                    : content.content_type === "podcast"
                    ? "Listen"
                    : "View"}
                </Button>
              </div>
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button onClick={() => handleComment(content.id)} className="button comment-button">
                  Comment
                </Button>
              </div>
              {contentComments[content.id] && (
                <div className="comments">
                  {contentComments[content.id].map((comm) => (
                    <p key={comm.id}>{comm.text}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>View Content</h2>
            <p>Are you sure you want to open this content?</p>
            <div className="modal-buttons">
              <Button onClick={handleConfirmView} className="confirm-button">
                Yes
              </Button>
              <Button onClick={handleCancelView} className="cancel-button">
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
