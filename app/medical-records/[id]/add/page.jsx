"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';


const AddDocument = () => {

  const params = useParams();
  const userId = params.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    creator: params.id,
    name: '',
    document: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'document') {
      const file = e.target.files[0];
      const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (file && allowedFileTypes.includes(file.type)) {
        // Convert file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, document: reader.result });
        };
        reader.readAsDataURL(file);
      } else {
        setFormData({ ...formData, document: null });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${userId}/records`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Record added successfully!');
        setFormData({ userId: '', name: '', document: null });
        router.push(`/medical-records/${userId}`);
      } else {
        const { error } = await response.json();
        alert(`Failed to add record: ${error}`);
      }
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Error adding record. Please try again.');
    }
  };


  return (
    <>
    <h1 className="text-lg font-semibold blue_gradient mb-4">Add Medical Records</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
  <div className="mb-6">
    <label htmlFor="name" className="text-lg font-semibold mb-2">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder='Enter Document Name'
      value={formData.name}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded py-2 px-3"
    />
  </div>
  <div className="mb-6">
    <label htmlFor="document" className="text-lg font-semibold mb-2">Document:</label>
    <input
      type="file"
      id="document"
      name="document"
      accept="image/jpeg, image/png"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded py-2 px-3"
    />
  </div>
  <button type="submit" className="black_btn">
    Add Record
  </button>
</form>
</>

  )
}

export default AddDocument