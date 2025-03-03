import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

const Admin = () => {
  const { authToken } = useContext(UserContext);

  // User Management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");

  // Category Management
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  // Content Management
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [contentLink, setContentLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contents, setContents] = useState([]);

  // Review Management
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, [authToken]);

  // Fetch Functions
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/categories", {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/content", {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  // User Management Functions
  const handleAddUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          firstName: username,
          lastName: "User",
          email: `${username}@app.com`,
          password,
          role,
        }),
      });

      if (response.ok) {
        toast.success("User added successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  const handleDeactivateUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${userId}/deactivate`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("User deactivated successfully!");
      } else {
        toast.error("Failed to deactivate user.");
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  // Category Management Functions
  const handleCreateCategory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        toast.success("Category created successfully!");
        setNewCategory("");
        fetchCategories();
      } else {
        toast.error("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/categories/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Category removed successfully!");
        fetchCategories();
      } else {
        toast.error("Failed to remove category.");
      }
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  // Content Management Functions
  const handlePostContent = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: contentTitle,
          description: contentDescription,
          category_id: selectedCategory,
          content_type: contentType,
          content_link: contentLink,
        }),
      });

      if (response.ok) {
        toast.success("Content posted successfully!");
        fetchContents();
      } else {
        toast.error("Failed to post content.");
      }
    } catch (error) {
      console.error("Error posting content:", error);
    }
  };

  const handleRemoveContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Content removed successfully!");
        fetchContents();
      } else {
        toast.error("Failed to remove content.");
      }
    } catch (error) {
      console.error("Error removing content:", error);
      toast.error("An error occurred while removing the content.");
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Content approved successfully!");
        fetchContents();
      } else {
        toast.error("Failed to approve content.");
      }
    } catch (error) {
      console.error("Error approving content:", error);
    }
  };

  const handleEditContent = (contentId) => {
    console.log("Editing content with ID:", contentId);
  };

  const handleLikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Content liked successfully!");
        fetchContents();
      } else {
        toast.error("Failed to like content.");
      }
    } catch (error) {
      console.error("Error liking content:", error);
    }
  };

  const handleDislikeContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/dislike`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Content disliked successfully!");
        fetchContents();
      } else {
        toast.error("Failed to dislike content.");
      }
    } catch (error) {
      console.error("Error disliking content:", error);
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/flag`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        toast.success("Content flagged successfully!");
        fetchContents();
      } else {
        toast.error("Failed to flag content.");
      }
    } catch (error) {
      console.error("Error flagging content:", error);
    }
  };

  // Added missing handleCommentContent for review management
  const handleCommentContent = async (contentId) => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/content/${contentId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (response.ok) {
        toast.success("Comment added successfully!");
        setComment("");
        fetchContents();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Page Header */}
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Profile Button Below Title (Right Aligned) */}
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/profile" className="profile-button">
          My Profile
        </Link>
      </div>

      <div className="dashboard-container">
        {/* ---------------------------- */}
        {/* User Management Section     */}
        {/* ---------------------------- */}
        <section className="dashboard-section user-management">
          <h2 className="section-title">User Management</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="User ID to Deactivate"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input-field"
          />
          <div className="button-group">
            <button onClick={handleAddUser} className="action-button add">
              Add User
            </button>
            <button onClick={handleDeactivateUser} className="action-button deactivate">
              Deactivate User
            </button>
          </div>
        </section>

        {/* ---------------------------- */}
        {/* Category Management Section */}
        {/* ---------------------------- */}
        <section className="dashboard-section category-management">
          <h2 className="section-title">Category Management</h2>
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="input-field"
          />
          <div className="button-group">
            <button onClick={handleCreateCategory} className="action-button add">
              Create Category
            </button>
          </div>
          <div className="category-dropdown">
            <button onClick={() => setShowCategories(!showCategories)} className="dropdown-toggle">
              {showCategories ? "Hide Categories" : "Show Categories"}
            </button>
            {showCategories && (
              <div className="dropdown-list">
                {categories.map((category) => (
                  <div key={category.id} className="category-item">
                    {category.name}
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="action-button remove-category"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------------------- */}
        {/* Content Management Section  */}
        {/* ---------------------------- */}
        <section className="dashboard-section content-management">
          <h2 className="section-title">Content Management</h2>
          <input
            type="text"
            placeholder="Content Title"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="input-field"
          />
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="input-field"
          >
            <option value="video">Video</option>
            <option value="note">Note</option>
            <option value="podcast">Podcast</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">Choose Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Content Link"
            value={contentLink}
            onChange={(e) => setContentLink(e.target.value)}
            className="input-field"
          />
          <div className="button-group">
            <button onClick={handlePostContent} className="action-button add">
              Post Content
            </button>
          </div>
        </section>

        {/* ---------------------------- */}
        {/* Review Management Section   */}
        {/* ---------------------------- */}
        <section className="dashboard-section review-management">
          <h2 className="section-title">Review Content</h2>
          <div className="review-grid">
            {contents.map((content) => (
              <div key={content.id} className="review-card">
                <h3 className="review-title">{content.title}</h3>
                <p className="review-description">{content.description}</p>

                <div className="comment-section">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-field"
                  />
                  <button
                    onClick={() => handleCommentContent(content.id)}
                    className="action-button comment"
                  >
                    Comment
                  </button>
                </div>
                <div className="dropdown">
                  <button className="dropdown-button">Actions ▼</button>
                  <div className="dropdown-content">
                    <button onClick={() => handleLikeContent(content.id)} className="action-button like">
                      Like
                    </button>
                    <button onClick={() => handleDislikeContent(content.id)} className="action-button dislike">
                      Dislike
                    </button>
                    <button onClick={() => handleFlagContent(content.id)} className="action-button flag">
                      Flag
                    </button>
                    <button onClick={() => handleRemoveContent(content.id)} className="action-button remove">
                      Remove
                    </button>
                    <button onClick={() => handleApproveContent(content.id)} className="action-button approve">
                      Approve
                    </button>
                    <button onClick={() => handleEditContent(content.id)} className="action-button edit">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
