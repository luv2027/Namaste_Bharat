"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
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
const hotelSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, require: true },
    country: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    adultCount: { type: Number, require: true },
    childCount: { type: Number, require: true },
    facilities: [{ type: String, require: true }],
    pricePerNight: { type: Number, require: true },
    starRating: { type: Number, require: true, min: 1, max: 5 },
    imageUrls: [{ type: String, require: true }],
    lastUpdated: { type: Date, require: true },
    bookings: [bookingSchema],
}); //created the table
const Hotel = mongoose_1.default.model("Hotel", hotelSchema); //we told that ts that this is a model of type HotelType
exports.default = Hotel;
