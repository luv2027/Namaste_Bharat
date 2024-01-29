import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import cloudinary  from "cloudinary";
import { HotelType } from "../shared/types";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";


const router = express.Router();

const storage = multer.memoryStorage(); // We want to store any file like text or an image in memory
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

//api/my-hotels
router.post("/", verifyToken, [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
  body("facilities").isArray({min: 1}).withMessage("At least one facility is required"),
],  upload.array("imageFiles", 6) ,  async (req:Request , res:Response) => {
  try{
    const imageFiles = req.files as Express.Multer.File[]; // for images from the form
    const newHotel: HotelType = req.body; //for form data

    //1. upload images to cloudinary
    const imageUrls = await uploadImages(imageFiles); // As all images will be uoloaded all at a time we want to wait for all of them to be uploaded so we use Promise.all

     //2 If upload was successful, create a new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;//from the token cookie

    //3 Save the new hotel to the database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    //4 retur a 201 status
    res.status(201).send(hotel);
  }
  catch(e){
    console.log("Error creating hotel: ", e);
    res.status(500).json({message: "Something went wrong"});
  }
})

//api/my-hotels
router.get("/", verifyToken, async(req: Request, res: Response) => {

  try{
    const hotels = await Hotel.find({userId: req.userId})
    res.json(hotels);
  }
  catch(error){
    res.status(500).json({message: "Error fetching hotels"});
  }
})


//api/my-hotels/:id
router.get("/:id", verifyToken, async(req: Request, res: Response) => {
  const id = req.params.id.toString();
  try{
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId
    })
    res.json(hotel);
  }
  catch(error){
    res.status(500).json({message: "Error fetching hotel"});
  }
})

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async(req:Request, res: Response) => {
  try{
    const updatedHotel : HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId,
      userId: req.userId,
    }, updatedHotel, {new: true})

    if(!hotel){
      return res.status(404).json({message: "Hotel not found"});
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls= [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
    await hotel.save();
  }
  catch(error){
    res.status(500).json({message: "Error updating hotel"});
  }

})

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64"); // convert image to base64
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises); // As all images will be uoloaded all at a time we want to wait for all of them to be uploaded so we use Promise.all
  return imageUrls;
}


export default router;