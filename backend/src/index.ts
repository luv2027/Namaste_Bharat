import express  from "express";
import cors from 'cors';
import "dotenv/config";
import exp from "constants";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/api/test", async (req, res) => {
  res.json({message: "Hello from express endpoint!"});
})

app.listen(7000, () => {
  console.log("Server is listening on port 7000");
});