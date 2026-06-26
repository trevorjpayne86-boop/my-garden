import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export default function FlowerBedCard({ bed, plants = [], onEdit, onDelete, onAddPlant, onDeletePlant }) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900">{bed.name}</h3>
          <Button variant="outline" size="sm" onClick={() => onAddPlant(bed)} className="gap-1 h-8">
            <Plus className="w-4 h-4" /> Add Plant
          </Button>
        </div>
        
        <div className="mb-6 min-h-[120px] bg-slate-50 rounded-md p-3 border border-slate-100">
          {plants.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-8">No plants yet.</p>
          ) : (
            <ul className="space-y-2">
              {plants.map(plant => (
                <li key={plant.id} className="text-sm bg-white border border-slate-200 px-3 py-2 rounded-md flex justify-between items-center shadow-sm">
                  <span className="font-medium text-slate-700">{plant.name}</span>
                  <button onClick={() => onDeletePlant(plant.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-2 border-t pt-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(bed)} className="flex-1 gap-2 text-slate-600">
          <Edit2 className="w-4 h-4" /> Edit Bed
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(bed)} className="flex-1 gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">
          <Trash2 className="w-4 h-4" /> Delete Bed
        </Button>
      </div>
    </div>
  );
}