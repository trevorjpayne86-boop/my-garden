import React, { useState } from 'react';
import { supabase } from "../../supabaseClient"; // Adjust path if necessary

const FlowerBedForm = ({ onBedAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    photo_url: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('flower_beds')
      .insert([formData]);

    if (error) {
      console.error('Error adding flower bed:', error);
    } else {
      onBedAdded();
      setFormData({ name: '', location: '', photo_url: '', notes: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
      <h3>Add New Flower Bed</h3>
      <input name="name" placeholder="Bed Name" value={formData.name} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input name="photo_url" placeholder="Photo URL" value={formData.photo_url} onChange={handleChange} />
      <textarea name="notes" placeholder="Ground conditions/Notes" value={formData.notes} onChange={handleChange} />
      <button type="submit">Add Flower Bed</button>
    </form>
  );
};

export default FlowerBedForm;