import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://binbceqhqhokbvaysids.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbmJjZXFocWhva2J2YXlzaWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2MzMzNjksImV4cCI6MTk4ODIwOTM2OX0.gr6y-skjoUbHR1RWcy3CGHNXbgeAHM7j66PbVpkUzqU"
);
