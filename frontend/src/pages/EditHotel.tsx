import {useParams}  from 'react-router-dom';
import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';


const EditHotel = () => {
  const {hotelId} = useParams();

  const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ''), {
    enabled: !!hotelId, // only run this query if hotelId is present so that we dont get an error when the value of hotelId is undefined
  } 
  );

  return <ManageHotelForm hotel={hotel} />
}

export default EditHotel;