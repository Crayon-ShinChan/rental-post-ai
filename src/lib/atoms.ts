import { atom } from "jotai";

type Post = {
  bathroom: number;
  bedroom: number;
  parking: number;
  rental_form: string;
  lease_terms: number;
  pet_allowed: boolean;
  water: boolean;
  hydro: boolean;
  heat: boolean;
  internet: boolean;
  air_conditioning: boolean;
  gym: boolean;
  pool: boolean;
  dishwasher: boolean;
  EV_charging: boolean;
  storage: boolean;
  in_suite_laundry: boolean;
  property_type: string;
  description: string;
  title: string;
  address: string;
  price: number;
};

export const postAtom = atom<Post>({
  bathroom: 0,
  bedroom: 0,
  parking: 0,
  rental_form: "",
  lease_terms: 0,
  pet_allowed: false,
  water: false,
  hydro: false,
  heat: false,
  internet: false,
  air_conditioning: false,
  gym: false,
  pool: false,
  dishwasher: false,
  EV_charging: false,
  storage: false,
  in_suite_laundry: false,
  property_type: "",
  description: "",
  title: "",
  address: "",
  price: 0,
});
