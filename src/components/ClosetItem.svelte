<script lang="ts">
	import { deleteClosetItem, type ClosetItem } from "../stores/closetStore";
	import Svg from "./Svg.svelte";

	export let closetItem: ClosetItem;
</script>

<!-- ${
    closetItem.completed ? 'line-through' : ''
} -->

<li class="bg-gray-700 text-white font-bold flex items-center shadow-sm border border-gray-600 rounded-lg my-2 py-2 px-4">
	<Svg type={closetItem.type} fill={closetItem.color_hex} />
	<span class={`flex-1`}>
		{closetItem.color_name}{" "}{closetItem.type}
	</span>
	<button
		type="button"
		class="text-sm bg-red-500 hover:bg-red-600 font-semibold text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
		on:click={() => deleteClosetItem(closetItem.id)}
	>
		Delete
	</button>
</li>
