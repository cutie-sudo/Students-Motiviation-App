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
  const [categories, setCategories] = useState([]); // NEW: holds categories from backend
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalContentLink, setModalContentLink] = useState("");

  const token = localStorage.getItem("token");

  // Fetch categories & contents on mount
  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, []);

  // -----------------------------
  // Fetch categories from backend
  // -----------------------------
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/categories", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    }
  };

  // Fetch all contents from backend
  const fetchContents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/content", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setError("Failed to fetch contents. Please try again later.");
    }
  };

  // Create Profile (unchanged)
  const handleCreateProfile = async () => {
    if (!profile.name || !profile.email) {
      setError("Name and email are required to create a profile.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
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

  // Subscribe to a category
  const handleSubscribeCategory = async (category) => {
    try {
      if (subscribedCategories.includes(category)) {
        setError(`Already subscribed to ${category}`);
        return;
      }
      const response = await fetch("http://127.0.0.1:5000/subscribe", {
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

  // Comment on content
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

  // Add content to wishlist
  const handleAddToWishlist = async (contentTitle) => {
    try {
      if (wishlist.includes(contentTitle)) {
        setError("Content already in wishlist");
        return;
      }
      const response = await fetch("http://127.0.0.1:5000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: contentTitle }),
      });
      if (response.ok) {
        setWishlist((prev) => [...prev, contentTitle]);
        setSuccess("Added to wishlist!");
        setTimeout(() => setSuccess(""), 3000);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add to wishlist. Please try again later.");
    }
  };

  // Like content (updates local like count; assumes backend returns updated likes)
  const handleLikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json(); // expected: { likes: newCount }
        setContents((prev) =>
          prev.map((content) =>
            content.id === contentId ? { ...content, likes: data.likes } : content
          )
        );
        setSuccess("Liked!");
        setTimeout(() => setSuccess(""), 3000);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error liking content:", error);
      setError("Failed to like content. Please try again later.");
    }
  };

  // Dislike content (updates local dislike count; assumes backend returns updated dislikes)
  const handleDislikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/dislike`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json(); // expected: { dislikes: newCount }
        setContents((prev) =>
          prev.map((content) =>
            content.id === contentId ? { ...content, dislikes: data.dislikes } : content
          )
        );
        setSuccess("Disliked!");
        setTimeout(() => setSuccess(""), 3000);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error disliking content:", error);
      setError("Failed to dislike content. Please try again later.");
    }
  };

  // Modal for viewing content
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

  // Category filtering
  // Now we do an *exact match* on category name for clarity.
  // If you need partial matches, you can revert to .includes() logic.
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredContents =
    selectedCategory === "All"
      ? contents
      : contents.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <h1>Student Dashboard</h1>
        <p>
          Get inspired by the Moringa School community. Access verified tech content, expert interviews, and success stories.
        </p>
      </header>

      {/* NAVIGATION - Dynamically generated categories + 'All' */}
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

      {/* PROFILE BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/profile" className="profile-button">
          My Profile
        </Link>
      </div>

      {/* SUCCESS / ERROR MESSAGES */}
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      {/* CONTENT SECTION */}
      <div className="content-section">
        {filteredContents.map((content) => (
          <Card key={content.id} className="recommended-content">
            <CardContent>
              <h3 className="content-title">{content.title}</h3>

              {/* Display summary if present, otherwise fallback to description */}
              {content.summary ? (
                <p className="content-summary">{content.summary}</p>
              ) : (
                <p className="content-description">{content.description}</p>
              )}

              {/* Display author if present */}
              {content.author && (
                <div className="content-author">
                  <strong>Author:</strong> {content.author}
                </div>
              )}

              {/* Display content type & any other info you want */}
              <div className="content-footer">
                <span className="content-type">{content.content_type}</span>
                {/* If you have a duration or other fields in your DB, show them here */}
                {content.duration && (
                  <span className="content-duration">Duration: {content.duration}</span>
                )}
              </div>

              <div className="content-actions">
                <Button onClick={() => handleLikeContent(content.id)} className="button button-green">
                  Like {content.likes ? `(${content.likes})` : ""}
                </Button>
                <Button onClick={() => handleDislikeContent(content.id)} className="button button-red">
                  Dislike {content.dislikes ? `(${content.dislikes})` : ""}
                </Button>
                <Button onClick={() => handleAddToWishlist(content.title)} className="button button-purple">
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

      {/* MODAL POPUP FOR VIEWING CONTENT */}
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
