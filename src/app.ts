import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { PORT } from "@/config";
import { HttpError } from "./utils/httpError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", routes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});

app.listen(8080, async () => {
    console.log(`Server running on port ${8080}`);
});

export default app;
