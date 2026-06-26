import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import FlowerBedCard from '@/components/garden/FlowerBedCard';
import FlowerBedForm from '@/components/garden/FlowerBedForm';
import PlantForm from '@/components/garden/PlantForm';

export default function Garden() {
  const queryClient = useQueryClient();
  
  // UI State Controls
  const [bedFormOpen, setBedFormOpen] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const [plantFormOpen, setPlantFormOpen] = useState(false);
  const [activeBedForPlant, setActiveBedForPlant] = useState(null);

  // Fetch Live Data from Supabase
  const { data: beds = [] } = useQuery({ queryKey: ['beds'], queryFn: base44.entities.FlowerBed.list });
  const { data: plants = [] } = useQuery({ queryKey: ['plants'], queryFn: base44.entities.Plant.list });

  // Database Actions (Beds)
  const saveBed = useMutation({
    mutationFn: (data) => editingBed ? base44.entities.FlowerBed.update(editingBed.id, data) : base44.entities.FlowerBed.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beds'] });
      setBedFormOpen(false);
    }
  });
  
  const deleteBed = useMutation({
    mutationFn: base44.entities.FlowerBed.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['beds'] })
  });

  // Database Actions (Plants)
  const savePlant = useMutation({
    mutationFn: base44.entities.Plant.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      setPlantFormOpen(false);
    }
  });

  const deletePlant = useMutation({
    mutationFn: base44.entities.Plant.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plants'] })
  });

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Garden Tracker</h1>
        <Button onClick={() => { setEditingBed(null); setBedFormOpen(true); }}>
          + Add Flower Bed
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map(bed => (
          <FlowerBedCard 
            key={bed.id} 
            bed={bed} 
            // We filter the massive list of plants to only show the ones that belong to this specific bed
            plants={plants.filter(p => p.flower_bed_id === bed.id)}
            onEdit={(b) => { setEditingBed(b); setBedFormOpen(true); }}
            onDelete={(b) => deleteBed.mutate(b.id)}
            onAddPlant={(b) => { setActiveBedForPlant(b); setPlantFormOpen(true); }}
            onDeletePlant={(plantId) => deletePlant.mutate(plantId)}
          />
        ))}
      </div>

      <FlowerBedForm 
        open={bedFormOpen} 
        onOpenChange={setBedFormOpen} 
        bed={editingBed} 
        onSave={saveBed.mutate} 
      />

      <PlantForm
        open={plantFormOpen}
        onOpenChange={setPlantFormOpen}
        bed={activeBedForPlant}
        onSave={savePlant.mutate}
      />
    </div>
  );
}