"use client";
import React, { useState } from "react";

const AddUserPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user || !password || !role) {
      setError("All fields are required!");
      return;
    }

    try {
      const newUser = { user, password, role };

      // Send request to the backend to add the user (assuming you have this API endpoint)
      const response = await fetch(
        "https://anizen-server.onrender.com/api/add-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("User added successfully!");
        setUser("");
        setPassword("");
        setRole("");
      } else {
        setError(result.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Error occurred while adding the user");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 mt-10 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700"
          >
            User
          </label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter user email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
