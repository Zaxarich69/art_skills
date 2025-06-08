import React, { useState } from "react";

const ProfileForm = ({ user, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <label>Email:</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
