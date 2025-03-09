import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

const Admin = () => {
  const { authToken } = useContext(UserContext);
  // console.log("Auth token:", authToken); // Debugging token

  // Existing State & Logic (unchanged)

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
  // Removed contentDescription input field if not needed
  const [contentType, setContentType] = useState("video");
  const [contentLink, setContentLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contents, setContents] = useState([]);
  // New fields for summary and author
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");

  // Review Management
  const [comment, setComment] = useState("");

  // NEW: Sidebar Toggle & Active Section
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  // Fetch data on mount
  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, [authToken]);

  // Fetch Functions (unchanged)
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/categories", {
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
      const response = await fetch("https://backend-student-motivation-app-1.onrender.com/content", {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  // User Management Functions (unchanged)
  const handleAddUser = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-1.onrender.com/signup", {
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
      const response = await fetch(
        `https://backend-student-motivation-app-4.onrender.com/users/${userId}/deactivate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include", // Ensures cookies are sent if needed
        }
      );
  
      const data = await response.json(); // Parse response
  
      if (response.ok) {
        toast.success(data.message || "User deactivated successfully!");
      } else {
        console.error("Failed to deactivate user:", data.message);
        toast.error(data.message || "Failed to deactivate user.");
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      toast.error("Failed to connect to the server.");
    }
  };
  
  
  // Category Management Functions (unchanged)
  const handleCreateCategory = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/categories", {
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
      const response = await fetch(
        `https://backend-student-motivation-app-4.onrender.com/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: { 
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to remove category.");
      }
  
      toast.success("Category removed successfully!");
      await fetchCategories(); // Ensure it completes before proceeding
    } catch (error) {
      console.error("Error removing category:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  

  // Content Management Functions (updated)
  const handlePostContent = async () => {
    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: contentTitle,
          category_id: selectedCategory,
          content_type: contentType,
          content_link: contentLink,
        }),
      });
  
      const responseData = await response.json().catch(() => null);
  
      if (!response.ok) {
        throw new Error(responseData?.message || "Failed to post content.");
      }
  
      toast.success("Content posted successfully!");
      await fetchContents(); // Ensure content refresh before proceeding
    } catch (error) {
      console.error("Error posting content:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  

  const handleRemoveContent = async (contentId) => {
    try {
      const response = await fetch(`https://backend-student-motivation-app-4.onrender.com/content/${contentId}`, {
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
      const response = await fetch(
        `https://backend-student-motivation-app-4.onrender.com/content/${contentId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      const responseData = await response.json().catch(() => null);
  
      if (!response.ok) {
        throw new Error(responseData?.message || "Failed to approve content.");
      }
  
      toast.success("Content approved successfully!");
      await fetchContents(); // Ensure the UI updates after approval
    } catch (error) {
      console.error("Error approving content:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  

  const handleEditContent = async (contentId) => {
    try {
      console.log("Editing content with ID:", contentId);
  
      const response = await fetch(
        `https://backend-student-motivation-app-4.onrender.com/content/${contentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      const contentData = await response.json().catch(() => null);
  
      if (!response.ok) {
        throw new Error(contentData?.message || "Failed to fetch content details.");
      }
  
      // Assuming you have a state setter function to store content data
      setEditingContent(contentData); // Update state with fetched content
      setIsEditModalOpen(true); // Open modal or edit form
  
    } catch (error) {
      console.error("Error fetching content for edit:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  

  const handleLikeContent = async (contentId) => {
    try {
      const response = await fetch(`https://backend-student-motivation-app-4.onrender.com/content/${contentId}/like`, {
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
      const response = await fetch(`https://backend-student-motivation-app-4.onrender.com/content/${contentId}/dislike`, {
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
      const response = await fetch(`https://backend-student-motivation-app-4.onrender.com/content/${contentId}/flag`, {
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

  
  return (
    <div className="admin-dashboard">
      {/* Top Header with Sidebar Toggle */}
      <div className="admin-header">
       
        <h1 className="dashboard-title" onClick={() => setActiveSection("")} style={{ cursor: "pointer" }}>
          Admin Dashboard
        </h1>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Hide " : "Show"}
        </button>
      </div>

      {/* Main Body: Sidebar + Main Content */}
      <div className="admin-body">
        <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <ul className="sidebar-links">
            <li
              onClick={() => setActiveSection("userManagement")}
              className={`sidebar-link ${activeSection === "userManagement" ? "active" : ""}`}
            >
              User Management
            </li>
            <li
              onClick={() => setActiveSection("categoryManagement")}
              className={`sidebar-link ${activeSection === "categoryManagement" ? "active" : ""}`}
            >
              Category Management
            </li>
            <li
              onClick={() => setActiveSection("contentManagement")}
              className={`sidebar-link ${activeSection === "contentManagement" ? "active" : ""}`}
            >
              Content Management
            </li>
            <li
              onClick={() => setActiveSection("reviewManagement")}
              className={`sidebar-link ${activeSection === "reviewManagement" ? "active" : ""}`}
            >
              Review Management
            </li>
          </ul>
          <Link to="/profile" className="profile-button">
            My Profile
          </Link>
        </aside>

        <div className="dashboard-container">
          {/* Landing Page: Visible only if no section is active */}
          <div style={{ display: activeSection ? "none" : "block" }} className="landing-page">
            <h2>Welcome!</h2>
            <p>
              Empower your learning journey with TechElevate – your central hub for motivational resources.
              Here, you can manage a vibrant collection of inspiring videos, comprehensive notes, and engaging podcasts,
              all designed to drive success and fuel your academic passion. Explore, curate, and share content that
              motivates students to achieve their best.
            </p>
          </div>

          {/* User Management Section */}
          <section
            style={{ display: activeSection === "userManagement" ? "block" : "none" }}
            className="dashboard-section user-management"
          >
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

          {/* Category Management Section */}
          <section
            style={{ display: activeSection === "categoryManagement" ? "block" : "none" }}
            className="dashboard-section category-management"
          >
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
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="dropdown-toggle"
              >
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

          {/* Content Management Section */}
          <section
            style={{ display: activeSection === "contentManagement" ? "block" : "none" }}
            className="dashboard-section content-management"
          >
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
            {/* New input for short summary */}
            <input
              type="text"
              placeholder="Short Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="input-field"
            />
            {/* New input for author */}
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input-field"
            />
            <div className="button-group">
              <button onClick={handlePostContent} className="action-button add">
                Post Content
              </button>
            </div>
          </section>

          {/* Review Management Section */}
          <section
            style={{ display: activeSection === "reviewManagement" ? "block" : "none" }}
            className="dashboard-section review-management"
          >
            <h2 className="section-title">Review Content</h2>
            <div className="review-grid">
              {contents.map((content) => (
                <div key={content.id} className="review-card">
                  <h3 className="review-title">{content.title}</h3>
                  <p className="review-description">{content.description}</p>
                 
                  <div className="review-actions">
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
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
