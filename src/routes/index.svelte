<script>
    import { closet } from "../stores/closetStore"
    import ClosetItemForm from '../components/ClosetItemForm.svelte';
    import ClosetItem from '../components/ClosetItem.svelte';
    
</script>

<main>
    <ClosetItemForm/>
    <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        My Closet
    </h1>
    {#each $closet as closetItem (closetItem.id)}
      <ClosetItem closetItem={closetItem}/>
    {/each}
</main>


