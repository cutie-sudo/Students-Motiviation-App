import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { current_user, authToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Local state for text fields and profile pic filename
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    profile_pic: "", // stores filename or URL of profile picture
  });

  // For file upload
  const [selectedFile, setSelectedFile] = useState(null);

  // Populate form with current_user data once it's loaded
  useEffect(() => {
    if (current_user) {
      setFormData({
        username: current_user.username || "",
        email: current_user.email || "",
        password: "",
        role: current_user.role || "",
        profile_pic: current_user.profile_pic || "",
      });
    }
  }, [current_user]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update for text fields
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password, // If blank, password won't be updated
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        // Optionally, you could refresh user context here
      } else {
        toast.error(data.error || "Profile update failed.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Server error. Please try again.");
    }
  };

  // Handle file selection change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle uploading the profile picture
  const handleUploadPicture = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/profile/picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: uploadData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile picture updated successfully!");
        // Update local state with new profile picture filename so that image updates
        setFormData((prev) => ({ ...prev, profile_pic: data.profile_pic }));
      } else {
        toast.error(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Server error during upload. Please try again.");
    }
  };

  if (!current_user) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  // Build the URL to display the profile picture.
  // Assumes your Flask route serves the image at /uploads/<filename>
  const profilePicUrl = formData.profile_pic
    ? `http://localhost:5000/uploads/${formData.profile_pic}`
    : "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Display current profile picture */}
      <img
        src={profilePicUrl}
        alt="Profile"
        className="rounded-full mb-4"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />

      {/* File input for changing profile picture */}
      <div className="mb-6">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUploadPicture}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Upload Picture
        </button>
      </div>

      {/* Profile update form for text fields */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            type="email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            New Password <span className="text-gray-500">(optional)</span>
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            type="password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            name="role"
            value={formData.role}
            disabled
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
            type="text"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
