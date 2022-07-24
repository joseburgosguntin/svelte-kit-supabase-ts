<script lang="ts">
	import Svg from "./Svg.svelte";
	import type { ClosetItem } from "../stores/closetStore";

	function randomIntFromInterval(min: number, max: number) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	export let closet: ClosetItem[];
	let tops: ClosetItem[] = closet.filter((item: ClosetItem) => item.type == "shirt");
	let bottoms: ClosetItem[] = closet.filter(
		(item: ClosetItem) => item.type == "shorts" || item.type == "pants"
	);

	let randomTop: ClosetItem = tops[randomIntFromInterval(0, tops.length)];
	let randomBottom: ClosetItem = bottoms[randomIntFromInterval(0, bottoms.length)];
	const reShuffle = (): void => {
		randomTop = tops[randomIntFromInterval(0, tops.length)];
		randomBottom = bottoms[randomIntFromInterval(0, bottoms.length)];
	};
</script>

<div>
	<button
		on:click={() => {
			reShuffle();
		}}>Shuffle</button
	>
	<Svg type={randomTop.type} fill={randomTop.color_hex} />
	<Svg type={randomBottom.type} fill={randomBottom.color_hex} />
</div>
