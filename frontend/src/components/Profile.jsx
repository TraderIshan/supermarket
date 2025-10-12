import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user || {});

  const handleSave = () => {
    // TODO: Implement profile update API
    alert('Profile updated!');
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {user ? (
        <div>
          {editMode ? (
            <div>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  value={updatedUser.username || user.username}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label className="block">Email</label>
                <input
                  type="email"
                  value={updatedUser.email || user.email}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  className="w-full p-2 border"
                />
              </div>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 mr-2">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-600 text-white px-4 py-2">Cancel</button>
            </div>
          ) : (
            <div>
              <p className="mb-2"><strong>Username:</strong> {user.username}</p>
              <p className="mb-4"><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2">Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
