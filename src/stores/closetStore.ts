import { writable, type Writable } from 'svelte/store';
import {supabase} from "../supabase.js";
import axios from 'axios';

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
      const jsonResult = data
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

export const closet: Writable<any[]> = writable([]);

export const loadCloset = async () => {
    const {data, error} = await supabase.from('closet').select();
    if(error) {
        return console.error(error);
    }
    closet.set(data);
}
loadCloset();

export const addClosetItem = async (type: string, color_hex: string, user_id: string) => {
    const color_name = await getColorName(color_hex)
    
    const {data, error} = await supabase.from('closet').insert([{type, color_hex, user_id, color_name}]);
    
    if(error) {
        return console.error(error);
    }

    closet.update(cur => [...cur, data[0]]);
};

export const deleteClosetItem = async (id: string) => {
    const {error} = await supabase.from('closet').delete().match({id});
    
    if(error) {
        return console.error(error);
    }

	closet.update((closet) => closet.filter((closetItem) => closetItem.id !== id));
};

// export const toggleClosetItemCompleted = async (id: string, currentState: string) => {
//     const {error} = await supabase.from('closet').update({completed: !currentState}).match({id})

//     if(error) {
//         return console.error(error);
//     }

// 	closet.update((closet) => {
// 		let index = -1;
// 		for (let i = 0; i < closet.length; i++) {
// 			if (closet[i].id === id) {
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (index !== -1) {
// 			closet[index].completed = !closet[index].completed;
// 		}
// 		return closet;
// 	});
// };
