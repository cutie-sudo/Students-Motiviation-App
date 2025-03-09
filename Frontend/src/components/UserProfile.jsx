import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { current_user, authToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    profile_pic: "",
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.error || "Profile update failed.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Server error. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);

    try {
      const response = await fetch("https://backend-student-motivation-app-4.onrender.com/profile/picture", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: uploadData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile picture updated successfully!");
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

  const profilePicUrl = formData.profile_pic
    ? `https://backend-student-motivation-app-4.onrender.com/uploads/${formData.profile_pic}`
    : "https://via.placeholder.com/150";

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <img src={profilePicUrl} alt="Profile" className="rounded-full mb-4" style={{ width: "150px", height: "150px", objectFit: "cover" }} />

      <div className="mb-6">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadPicture} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Upload Picture
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none" type="email" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password <span className="text-gray-500">(optional)</span></label>
          <input name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none" type="password" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input name="role" value={formData.role} disabled className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100" type="text" />
        </div>

        <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
}
