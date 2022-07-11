import { writable, type Writable } from 'svelte/store';
import type { User } from "@supabase/supabase-js"

export const user: Writable<User | undefined | null> = writable(null);
