// import type { User } from "@supabase/supabase-js";
import { writable } from "svelte/store"; //, type Writable

export const user = writable(false); //: Writable<User | null | undefined> | Writable<boolean>
