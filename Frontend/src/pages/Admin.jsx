import React, { useState } from "react";

const Admin = () => {
  // State for User Management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // State for Content Management
  const [contentTitle, setContentTitle] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // State for Category Management
  const [newCategory, setNewCategory] = useState("");
  // State for Profile Management
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminBio, setAdminBio] = useState("");
  // State for Content Review (comment input)
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>
      <div className="max-w-4xl w-full space-y-6">
        {/* User Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Management</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add User
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Deactivate User
              </button>
            </div>
          </div>
        </div>

        {/* Content Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Management</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Content Title"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Content Body"
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="DevOps">DevOps</option>
              <option value="FullStack">FullStack</option>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
            </select>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Approve Content
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Flag Content
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Remove Content
              </button>
            </div>
          </div>
        </div>

        {/* Category Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category Management</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Create Category
            </button>
            <div>
              <p className="font-semibold text-gray-700">Existing Categories:</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>DevOps</li>
                <li>FullStack</li>
                <li>Front-End</li>
                <li>Back-End</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Profile Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Management</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Admin Name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Admin Bio"
              value={adminBio}
              onChange={(e) => setAdminBio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Create Profile
            </button>
          </div>
        </div>

        {/* Content Posting & Editing Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post / Edit Content</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Edit Content Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Edit Content Details"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Post Content
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                Edit Content
              </button>
            </div>
          </div>
        </div>

        {/* Content Review Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Review</h2>
          <div className="space-y-4">
            <p className="font-semibold text-gray-700">Sample Content Title</p>
            <p className="text-gray-600">This is a sample content that users have posted.</p>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Like
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Dislike
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Comment
              </button>
            </div>
            <textarea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;