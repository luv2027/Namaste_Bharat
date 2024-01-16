import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import cloudinary  from "cloudinary";

const router = express.Router();


const storage = multer.memoryStorage(); // We want to store any file like text or an image in memory
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

//api/my-hotels
router.post("/", upload.array("imageFiles", 6) ,  async (req:Request , res:Response) => {
  try{
    const imageFiles = req.files as Express.Multer.File[]; // for images from the form
    const newHotel = req.body; //for form data


    //1. upload images to cloudinary
    const uploadPromises = imageFiles.map(async(image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");// convert image to base64
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises); // As all images will be uoloaded all at a time we want to wait for all of them to be uploaded so we use Promise.all


    //2 If upload was successful, create a new hotel

    //3 Save the new hotel to the database
    // retur a 201 status
  }
  catch(e){
    console.log("Error creating hotel: ", e);
    res.status(500).json({message: "Something went wrong"});
  }

  
})