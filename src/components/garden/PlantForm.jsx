import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PlantForm({ open, onOpenChange, bed, onSave }) {
  const [name, setName] = useState('');

  if (!open || !bed) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // We send the plant name AND the specific bed ID it belongs to
    await onSave({ name, flower_bed_id: bed.id });
    setName(''); 
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-900">Add Plant to {bed.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-700">Plant Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cherry Tomatoes"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Plant</Button>
          </div>
        </form>
      </div>
    </div>
  );
}