import {useParams}  from 'react-router-dom';
import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import {useMutation} from 'react-query';
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const {hotelId} = useParams();

  const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ''), {
    enabled: !!hotelId, // only run this query if hotelId is present so that we dont get an error when the value of hotelId is undefined
  } 
  );

  const {showToast} = useAppContext();

  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelId, {
    onSuccess: () => {
      showToast({message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error in saving hotel", type: "ERROR"})
    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
}

export default EditHotel;