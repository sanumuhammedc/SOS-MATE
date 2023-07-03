import { useState } from 'react';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    image: '',
    type: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Convert image to base64
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl blue_gradient font-bold mb-4">Add Doctor/Ambulance Driver</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select type</option>
            <option value="doctor">Doctor</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button
          type="submit"
          className="black_btn"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;