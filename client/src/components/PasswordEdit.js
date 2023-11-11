import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const usePasswordEdit = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend API to update the password
      const response = await axios.post('/api/update-password', {
        currentPassword,
        newPassword,
      });

      // Handle the response based on success/failure
      if (response.status === 200) {
        Swal.fire('Success', 'Password updated successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to update password', 'error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire('Error', 'Failed to update password', 'error');
    }

    // Clear the form fields
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="mt-3 text-left col-md-6">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            className="form-control"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default usePasswordEdit;
