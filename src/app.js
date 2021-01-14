import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


class RateController {
  static async exchange(req, res) {
    try{
      const result = await fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.symbols}`)
      const json = await result.json();
      return res.status(200).json({
        results: json
      });
      
    }  catch (error){
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}

app.get("/api/rates", RateController.exchange);

app.get("/", (req, res) => {
  res.send("Welcome to Green Lamp world");
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
