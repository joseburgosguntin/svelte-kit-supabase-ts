import { writable, type Writable } from "svelte/store"; //, type Writable
import { supabase } from "../supabase.js";
import axios from "axios";

interface GetColorName {
	hex: {
		value: string;
		clean: string;
	};
	rgb: {
		fraction: {
			r: number;
			g: number;
			b: number;
		};
		r: number;
		g: number;
		b: number;
		value: string;
	};
	hsl: {
		fraction: {
			h: number;
			s: number;
			l: number;
		};
		h: number;
		s: number;
		l: number;
		value: string;
	};
	hsv: {
		fraction: {
			h: number;
			s: number;
			v: number;
		};
		value: string;
		h: number;
		s: number;
		v: number;
	};
	name: {
		value: string;
		closest_named_hex: string;
		exact_match_name: boolean;
		distance: number;
	};
	cmyk: {
		fraction: {
			c: number;
			m: number;
			y: number;
			k: number;
		};
		value: string;
		c: number;
		m: number;
		y: number;
		k: number;
	};
	XYZ: {
		fraction: {
			X: number;
			Y: number;
			Z: number;
		};
		value: string;
		X: number;
		Y: number;
		Z: number;
	};
	image: {
		bare: string;
	};
	contrast: {
		value: string;
	};
	_links: {
		self: {
			href: string;
		};
	};
	_embedded: Record<string, unknown>;
}

export interface ClosetItem {
	id: string;
	type: string;
	color_hex: string;
	color_name: string;
	user_id: string;
}

async function getColorName(color_hex: string) { //
	try {
		const { data, status } = await axios.get<GetColorName>( // 
			`https://www.thecolorapi.com/id?hex=${color_hex.slice(1)}`,
			{
				headers: {
					Accept: "application/json"
				}
			}
		);
		const jsonResult = data;
		console.log(jsonResult.name.value);

		// 👇️ "response status is: 200"
		console.log("response status is: ", status);

		return jsonResult.name.value;
	} catch (error: unknown) { //
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
			return error.message;
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
}

export const closet: Writable<ClosetItem[]> = writable([]); //

export const loadCloset = async () => {
	const { data, error } = await supabase.from("closet").select();
	if (error) {
		return console.error(error);
	}
	closet.set(data);
};
loadCloset();

export const addClosetItem = async (type: string, color_hex: string, user_id: string) => { //, , 
	const color_name = await getColorName(color_hex);

	const { data, error } = await supabase
		.from("closet")
		.insert([{ type, color_hex, user_id, color_name }]);

	if (error) {
		return console.error(error);
	}

	closet.update((cur) => [...cur, data[0]]);
};

export const deleteClosetItem = async (id: string) => { //
	const { error } = await supabase.from("closet").delete().match({ id });

	if (error) {
		return console.error(error);
	}

	closet.update((closet) => closet.filter((closetItem) => closetItem.id !== id));
};
