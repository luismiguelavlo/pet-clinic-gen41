import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get request to the homepage",
  });
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({
    message: "Post request to the homepage",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
