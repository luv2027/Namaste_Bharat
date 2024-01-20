import useForm from "react-hook-form";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList; // only diff from backend
  adultCount: number;
  childCount: number;
}


const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  return (<form></form>)
}

export default ManageHotelForm;//We are going to make more partion to make it more command about the variable