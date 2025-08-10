// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvcrzgqagnmfxvrdnxbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2Y3J6Z3FhZ25tZnh2cmRueGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjYyMDksImV4cCI6MjA3MDQwMjIwOX0.mcGnSD7RYnzqeiRSIE3yKuyoIOxJKZXRwDBJOVilngk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
