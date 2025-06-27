import express from "express";
import deviceRoute from "./src/routes/deviceRoute";
import authRoute from "./src/routes/authRoute";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(authRoute);
app.use(deviceRoute);

app.listen(port, () => {
  console.log(`Rodando com express na porta http://localhost:${port}`);
});
