import React, { useState, useEffect } from 'react';

const FlowerBedForm = ({ open, onOpenChange, bed, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    photo_url: '',
    notes: ''
  });

  // Load existing data if editing
  useEffect(() => {
    if (bed) setFormData(bed);
  }, [bed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    setFormData({ name: '', location: '', photo_url: '', notes: '' });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold">{bed ? 'Edit' : 'Add'} Flower Bed</h2>
        <input name="name" placeholder="Bed Name" className="border p-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input name="location" placeholder="Location" className="border p-2" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
        <input name="photo_url" placeholder="Photo URL" className="border p-2" value={formData.photo_url} onChange={(e) => setFormData({...formData, photo_url: e.target.value})} />
        <textarea name="notes" placeholder="Ground conditions/Notes" className="border p-2" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => onOpenChange(false)}>Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Bed</button>
        </div>
      </form>
    </div>
  );
};

export default FlowerBedForm;