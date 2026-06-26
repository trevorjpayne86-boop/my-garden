import { createClient } from '@supabase/supabase-js';

// 1. Grab your secret keys from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Start the engine
export const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Rebuild the exact structure your app is already looking for
export const base44 = {
  entities: {
    FlowerBed: {
      list: async () => {
        const { data, error } = await supabase.from('flower_beds').select('*').order('name');
        if (error) throw error;
        return data;
      },
      create: async (data) => {
        const { data: newBed, error } = await supabase.from('flower_beds').insert([data]).select().single();
        if (error) throw error;
        return newBed;
      },
      update: async (id, data) => {
        const { data: updatedBed, error } = await supabase.from('flower_beds').update(data).eq('id', id).select().single();
        if (error) throw error;
        return updatedBed;
      },
      delete: async (id) => {
        const { error } = await supabase.from('flower_beds').delete().eq('id', id);
        if (error) throw error;
        return true;
      }
    },
    Plant: {
      list: async () => {
        const { data, error } = await supabase.from('plants').select('*');
        if (error) throw error;
        return data;
      },
      create: async (data) => {
        const { data: newPlant, error } = await supabase.from('plants').insert([data]).select().single();
        if (error) throw error;
        return newPlant;
      },
      delete: async (id) => {
        const { error } = await supabase.from('plants').delete().eq('id', id);
        if (error) throw error;
        return true;
      }
    }
  }
};