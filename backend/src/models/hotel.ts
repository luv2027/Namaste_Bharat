import mongoose from "mongoose";
import { HotelType, BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

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
  lastUpdated: {type: Date, require: true},
  bookings: [bookingSchema],
})//created the table

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);//we told that ts that this is a model of type HotelType

export default Hotel;