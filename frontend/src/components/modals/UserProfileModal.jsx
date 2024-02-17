import React from "react";
import "./UserProfileModal.css";

function UserProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Content for your modal */}
        <h2>User Profile</h2>
        {/* Add additional profile content here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default UserProfileModal;
