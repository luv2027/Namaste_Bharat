import mongoose from "mongoose";
import { HotelType } from "../shared/types";



const hotelSchema = new mongoose.Schema<HotelType>({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  city: {type: String, require: true}, 
  country: {type: String, require: true}, 
  description: {type: String, require: true}, 
  type: {type: String, require: true}, 
  adultCount: {type: Number, require: true}, 
  childCount: {type: Number, require: true}, 
  facilities: [{type: String, require: true}],
  pricePerNight: {type: Number, require: true},
  starRating: {type: Number, require: true, min:1, max:5},
  imageUrls: [{type: String, require: true}],
  lastUpdated: {type: Date, require: true}
})//created the table

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);//we told that ts that this is a model of type HotelType

export default Hotel;