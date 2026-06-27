import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const PlantForm = ({ open, onOpenChange, bed, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    latin_name: '',
    quantity: 1,
    notes: '',
    flower_bed_id: bed?.id // Automatically link to the bed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ ...formData, flower_bed_id: bed.id });
    setFormData({ name: '', latin_name: '', quantity: 1, notes: '', flower_bed_id: bed.id });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold">Add Plant to {bed?.name}</h2>
        <input name="name" placeholder="Plant Name" className="border p-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input name="latin_name" placeholder="Latin Name" className="border p-2" value={formData.latin_name} onChange={(e) => setFormData({...formData, latin_name: e.target.value})} />
        <input name="quantity" type="number" className="border p-2" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})} />
        <textarea name="notes" placeholder="Notes/Conditions" className="border p-2" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => onOpenChange(false)}>Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Plant</button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;