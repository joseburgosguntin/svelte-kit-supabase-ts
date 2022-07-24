<script>
    import { closet } from "../stores/closetStore"
    import ClosetItem from '../components/ClosetItem.svelte';
    import ClosetItemShuffle from "../components/ClosetItemShuffle.svelte";
    
</script>

<main>
    <h1 class="text-2xl font-bold text-center text-white md:text-3xl">
        My Closet
    </h1>
    {#each $closet as closetItem (closetItem.id)}
      <ClosetItem closetItem={closetItem}/>
    {/each}
    <ClosetItemShuffle closet={$closet}/>
</main>
