import { Router } from "express";
import { getDevice } from "../controllers/deviceController";

const router = Router();

router.get("/device", getDevice);

export default router;
