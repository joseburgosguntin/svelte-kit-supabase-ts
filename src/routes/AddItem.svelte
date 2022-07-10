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

<div>
    <h2>Hello World</h2>
    <HsvPicker on:colorChange={setColor} startColor={"#FBFBFB"}/>
    <select name="cars" id="cars" on:change={(v) => {select = v.target.options[v.target.options.selectedIndex].__value; console.log(v.target.options[v.target.options.selectedIndex].__value)}}>
      <option value="shirt">Shirt</option>
      <option value="shorts">Shorts</option>
      <option value="pants">Pants</option>
    </select>
    <Svg type={select} fill={itemColor}/>
    <button on:click={handleSubmit}>Button Add</button>
</div>