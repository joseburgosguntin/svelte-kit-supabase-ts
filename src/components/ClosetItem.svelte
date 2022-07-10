<script lang="ts">
    interface ClosetItem {
        id: string,
        type: string,
        color_hex: string
    }
    export let closetItem: ClosetItem;
    import { deleteClosetItem } from '../stores/closetStore';
    import Svg from './Svg.svelte';

    import axios from 'axios';

  // type User = {
  //   id: number;
  //   email: string;
  //   first_name: string;
  // };

  // type GetUsersResponse = {
  //   data: User[];
  // };

  async function getColorName(color_hex: string) {
    try {
      const { data, status } = await axios.get<any>(
        `https://www.thecolorapi.com/id?hex=${color_hex.slice(1, )}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      let jsonResult = data
      console.log(jsonResult.name.value);

    // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return jsonResult.name.value;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
    
</script>
<!-- ${
    closetItem.completed ? 'line-through' : ''
} -->

<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
    <Svg type={closetItem.type} fill={closetItem.color_hex} />
    <span
        class={`flex-1 text-gray-800`}
    >
        {getColorName(closetItem.color_hex)}{" "}{closetItem.type}
    </span>
    <button
        type="button"
        class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        on:click={() => deleteClosetItem(closetItem.id)}
    >
        Delete
    </button>
</li>