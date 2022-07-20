<script lang="ts">
	import { deleteClosetItem } from "../stores/closetStore";
	import Svg from "./Svg.svelte";

	interface ClosetItem {
		id: string;
		type: string;
		color_hex: string;
		color_name: string;
		user_id: string;
	}
	export let closetItem: ClosetItem;
</script>

<!-- ${
    closetItem.completed ? 'line-through' : ''
} -->

<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
	<Svg type={closetItem.type} fill={closetItem.color_hex} />
	<span class={`flex-1 text-gray-800`}>
		{closetItem.color_name}{" "}{closetItem.type}
	</span>
	<button
		type="button"
		class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
		on:click={() => deleteClosetItem(closetItem.id)}
	>
		Delete
	</button>
</li>
