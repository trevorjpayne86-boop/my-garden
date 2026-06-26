import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function FlowerBedForm({ open, onOpenChange, bed, onSave }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (bed) setName(bed.name || '');
    else setName('');
  }, [bed]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ name });
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-900">{bed ? 'Edit' : 'Add'} Flower Bed</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-700">Bed Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Front Yard Roses"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}