import { useState } from 'react';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    image: '',
    type: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        // Check if the user already exists
        const response = await fetch('/api/users/add', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 422) {
          const { error } = await response.json();
          alert(error);
          return;
        }

        if (response.ok) {
          alert('User added successfully!');
          // Reset the form
          setFormData({
            email: '',
            username: '',
            image: '',
            type: '',
          });
        } else {
          throw new Error('Failed to add user');
        }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="doctor">Doctor</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminDashboard;