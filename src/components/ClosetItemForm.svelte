<script lang="ts">
    // import {HsvPicker} from 'svelte-color-picker';
    import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
    import Svg from "../components/Svg.svelte";
    import {addClosetItem} from '../stores/closetStore';
    import {user} from '../stores/authStore.js';

    const handleSubmit = () => {
        console.log($user);
        addClosetItem(select, hex, $user!.id)
    }

    let hex: string;
    let select: string = "shirt";

</script>
<h1 class="text-2xl font-bold text-center text-white md:text-3xl mt-7">
  Add item to Closet
</h1>
<div class="bg-gray-700 rounded-2xl my-4 text-white font-bold p-4">
  <div>
    <div>
      1. Select the type
      <select class="rounded bg-gray-600" name="cars" id="cars" bind:value={select}>
        <option value="shirt">Shirt</option>
        <option value="shorts">Shorts</option>
        <option value="pants">Pants</option>
      </select>
    </div>
    <div class="selectAndSvgDiv"><Svg type={select} fill={hex}/></div>
    
  </div>
    <div>
      2. Select color
      <ColorPicker bind:hex 
          isOpen={true} 
          isPopup={false} 
          isAlpha={false} 
          isInput={false} 
          toRight={true} 
          isTextInput={false}
          components={{...ChromeVariant}}
      />
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