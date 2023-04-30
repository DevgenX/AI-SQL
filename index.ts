import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT: number = 8000;
app.use(cors());
app.use(express.json());

const API_KEY: string = process.env.API_KEY || "";

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "You are an expert in SQL, and you're goal is to provide SQL Queries, make them straight to the point without any additional text. Create a SQL request to " +
            req.body.message,
        },
      ],
    });

    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
