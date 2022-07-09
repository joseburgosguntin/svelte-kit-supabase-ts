<script lang="ts">
    import {supabase} from "../supabase.js"
    import ColorPicker from "./ColorPicker.svelte"
    import {HsvPicker} from 'svelte-color-picker';
    import Svg from "./Svg.svelte";
    import { BiPlusCircle } from 'react-icons/bi';
    
    let itemColor: any;
    let someFunction = (param: number) => {
      if (param < 16) {
        return "0" + param.toString(16);
      }
      return param.toString(16);
      // if (param != "") {
      //   return param.toString(16).toString();
      // } else {
      //   return "00";
      // }
    }

    function colorCallback(rgba: any) {
      let hexR = rgba.detail.r.toString(16);
      let hexRGB = "#" + someFunction(rgba.detail.r) + someFunction(rgba.detail.g) + someFunction(rgba.detail.b)
	    console.log(hexRGB);
      itemColor = hexRGB;
}

    

    let loading = false
    let email: string;
  
    const handleLogin = async () => {
      try {
        loading = true
        const { error } = await supabase.auth.signIn({ email })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (error: any) {
        alert(error.error_description || error.message)
      } finally {
        loading = false
      }
    }
    let shirtColor = "white";//black//#fed6ff
    let shortColor = "#ff6652";//
    let select: string = "shirt";
  </script>
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Log In
  </h1>
  <!-- <ColorPicker/> -->
  <HsvPicker on:colorChange={colorCallback} startColor={"#FBFBFB"}/>
  <!-- <svg width="150" height="150" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="white"/>
    <path d="M4.5 18H9H11H15.5V8L16.5 9L19 5.5L15.5 2L13 1L10 2L7 1L4.5 2L1 5.5L3.5 9L4.5 8V18Z" fill={shirtColor} stroke="black"/>
    </svg>
    <svg width="150" height="150" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" fill="white"/>
      <path d="M15.5 4H4.5L2 17L9 19L10 13L11 19L18 17L15.5 4Z" fill={shortsColor} stroke="black"/>
      </svg> -->
      <select name="cars" id="cars" on:change={(v) => {select = v.target.options[v.target.options.selectedIndex].__value; console.log(v.target.options[v.target.options.selectedIndex].__value)}}>
        <option value="shirt">Shirt</option>
        <option value="shorts">Shorts</option>
        <option value="pants">Pants</option>
      </select>
      <Svg type={select} fill={itemColor}/>
      <button on:click={console.log({select, itemColor})}>Button Add</button>
  <p class="text-center mt-2">Sign in via magic link with your email below.</p>
  <form class="form my-6" on:submit|preventDefault={handleLogin}>
          <div class="flex flex-col text-sm mb-2">
          <label for="todo" class="font-bold mb-2 text-gray-800 ">
              Email
          </label>
          <input
              type="email"
              name="email"
              bind:value={email}
              placeholder="Your email"
              class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg "
              
          />
      </div>
      <button
          type="submit"
          class=" w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          disabled={loading}
      >
          Log In
      </button>
  </form>
  