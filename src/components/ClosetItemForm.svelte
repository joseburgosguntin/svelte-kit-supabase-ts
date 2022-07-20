<script lang="ts">
    import {HsvPicker} from 'svelte-color-picker';
    import Svg from "../components/Svg.svelte";
    import {addClosetItem} from '../stores/closetStore';
    import {user} from '../stores/authStore.js';

    const handleSubmit = () => {
        console.log($user);
        addClosetItem(select, itemColor, $user.id)
    }

    interface Rgba {
      detail: {
        r: number;
        b: number;
        g: number;
        a: number;
      }
    }

    let itemColor: string;
    let select: string = "shirt";

    function setColor(rgba: Rgba) {
        let toHex = (param: number) => {
            if (param < 16) {
                return "0" + param.toString(16);
            }
            return param.toString(16);
        }
        let hexRGB = "#" + toHex(rgba.detail.r) + toHex(rgba.detail.g) + toHex(rgba.detail.b)
	    console.log(hexRGB);
        itemColor = hexRGB;
    }
</script>

<div class="bg-gray-700 rounded-2xl my-4 text-white font-bold p-4">
  <div class="">
    <div class="">
      1. Select the type
    <select class="rounded bg-gray-600" name="cars" id="cars" on:change={(v) => {select = v.target.options[v.target.options.selectedIndex].__value; console.log(v.target.options[v.target.options.selectedIndex].__value)}}>
      <option value="shirt">Shirt</option>
      <option value="shorts">Shorts</option>
      <option value="pants">Pants</option>
    </select>
    </div>
    <div class="selectAndSvgDiv"><Svg type={select} fill={itemColor}/></div>
    
  </div>
    <div class="">
      2. Select color
      <div class="text-black"><HsvPicker class="" on:colorChange={setColor} startColor={"#FBFBFB"}/></div>
    </div>  
</div>
<button class=" w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4" on:click={handleSubmit}>3. Add item to Closet</button>

<style>
  div {
    display: grid;
    flex-flow: row wrap;
    grid-template-columns: 3fr 2fr;
  }
  div div {
    display: flex;
    grid-template-columns: 1fr;
    grid-template-columns: auto;
    align-content: space-between;
    flex-direction: column;
  }
</style>