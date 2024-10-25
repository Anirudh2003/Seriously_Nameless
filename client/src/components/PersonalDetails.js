import React from 'react';

const PersonalDetails = ({ formData, handlePersonalDetailsChange }) => {
  return (
    <div>
      <h3>Personal Details</h3>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.personalDetails.name}
        onChange={handlePersonalDetailsChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.personalDetails.email}
        onChange={handlePersonalDetailsChange}
      />
      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={formData.personalDetails.phone}
        onChange={handlePersonalDetailsChange}
      />
    </div>
  );
};

export default PersonalDetails;
