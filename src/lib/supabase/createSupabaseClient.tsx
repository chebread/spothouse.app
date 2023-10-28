import { createClient } from '@supabase/supabase-js';

const createSupabaseClient = (options?: any) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  const client = createClient(
    supabaseUrl,
    supabaseKey,
    options === undefined ? {} : options
  );
  return client;
};

export default createSupabaseClient;
