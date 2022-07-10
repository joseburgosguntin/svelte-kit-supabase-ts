<script lang="ts">
    interface CartItem {
        id: string,
        type: string,
        hex_color: string
    }
    export let closetItem: CartItem;
    import { deleteClosetItem } from '../stores/closetStore';
    import Svg from './Svg.svelte';
    
</script>
<!-- ${
    closetItem.completed ? 'line-through' : ''
} -->

<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
    <Svg type={"shirt"} fill={"white"} />
    <span
        class={`flex-1 text-gray-800`}
    >
        {closetItem.hex_color}{" "}{closetItem.type}
    </span>
    <button
        type="button"
        class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        on:click={() => deleteClosetItem(closetItem.id)}
    >
        Delete
    </button>
</li>