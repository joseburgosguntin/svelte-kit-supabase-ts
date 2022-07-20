<script lang="ts">
	import {supabase} from "../supabase.js"
	import {HsvPicker} from 'svelte-color-picker';
	import Svg from "./Svg.svelte";
	  
	
  
  
	  type onChangeProp = EventTarget & HTMLSelectElement;
	  interface Rgba {
		detail: {
		  r: number;
		  b: number;
		  g: number;
		  a: number;
		}
	  }
  
	  let itemColor: string;
	  let someFunction = (param: number) => {
		if (param < 16) {
		  return "0" + param.toString(16);
		}
		return param.toString(16);
	  }
  
	  function colorCallback(rgba: Rgba) {
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
	<!-- <HsvPicker on:colorChange={colorCallback} startColor={"#FBFBFB"}/>
		<select name="cars" id="cars" on:change={(v) => {select = v.target.options[v.target.options.selectedIndex].__value; console.log(v.target.options[v.target.options.selectedIndex].__value)}}>
		  <option value="shirt">Shirt</option>
		  <option value="shorts">Shorts</option>
		  <option value="pants">Pants</option>
		</select>
		<Svg type={select} fill={itemColor}/>
		<button on:click={() => {console.log({select, itemColor})}}>Button Add</button> -->
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