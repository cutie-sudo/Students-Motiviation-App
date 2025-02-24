import React, { useState } from 'react';

const Admin = () => {
  // State for User Management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for Content Management
  const [contentTitle, setContentTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // State for Category Management
  const [newCategory, setNewCategory] = useState('');

  // State for Profile Management
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminBio, setAdminBio] = useState('');

  // State for Content Review (comment input)
  const [comment, setComment] = useState('');

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* User Management Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">User Management</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="space-x-2">
            <button className="btn btn-primary">Add User</button>
            <button className="btn btn-warning">Deactivate User</button>
          </div>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">Content Management</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Content Title"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Content Body"
            value={contentBody}
            onChange={(e) => setContentBody(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="DevOps">DevOps</option>
            <option value="FullStack">FullStack</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
          </select>
          <div className="space-x-2">
            <button className="btn btn-success">Approve Content</button>
            <button className="btn btn-danger">Flag Content</button>
            <button className="btn btn-secondary">Remove Content</button>
          </div>
        </div>
      </div>

      {/* Category Management Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">Category Management</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="input input-bordered w-full"
          />
          <button className="btn btn-info">Create Category</button>
          <div className="mt-2">
            <p className="font-semibold">Existing Categories:</p>
            <ul className="list-disc pl-5">
              <li>DevOps</li>
              <li>FullStack</li>
              <li>Front-End</li>
              <li>Back-End</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Profile Management Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">Profile Management</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Admin Bio"
            value={adminBio}
            onChange={(e) => setAdminBio(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
          <button className="btn btn-primary">Create Profile</button>
        </div>
      </div>

      {/* Content Posting & Editing Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">Post / Edit Content</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Edit Content Title"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Edit Content Details"
            className="textarea textarea-bordered w-full"
          />
          <div className="space-x-2">
            <button className="btn btn-success">Post Content</button>
            <button className="btn btn-warning">Edit Content</button>
          </div>
        </div>
      </div>

      {/* Content Review Section */}
      <div className="border rounded p-4 shadow-lg">
        <h2 className="text-2xl mb-2">Content Review</h2>
        <div className="space-y-2">
          <p className="font-semibold">Sample Content Title</p>
          <p>This is a sample content that users have posted.</p>
          <div className="space-x-2">
            <button className="btn btn-primary">Like</button>
            <button className="btn btn-secondary">Dislike</button>
            <button className="btn btn-info">Comment</button>
          </div>
          <textarea
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
