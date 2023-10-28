import createSupabaseClient from './createSupabaseClient';

const adminAuthClient = createSupabaseClient({
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}).auth.admin;

export default adminAuthClient;
