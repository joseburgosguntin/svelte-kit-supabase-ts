<script lang="ts">
    import "../app.css";
    import {supabase} from "../supabase.js";
    import {user} from "../stores/authStore";
    import Auth from "../components/Auth.svelte";
    import Navbar from "../components/Navbar.svelte";
    import { loadCloset } from "../stores/closetStore";
	import ClosetItemForm from "./../components/ClosetItemForm.svelte";

    user.set(supabase.auth.user())

    supabase.auth.onAuthStateChange(( _, session) => {
        user.set(session!.user);
        if(session?.user){
            loadCloset();
        }
    });
</script>

<div class="container mx-auto my-6 max-w-lg">        
    {#if $user}
        <Navbar/>
        <ClosetItemForm/>
        <slot></slot>
    {:else }
        <Auth/>
    {/if}
</div>