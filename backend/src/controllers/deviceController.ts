import { Request, Response } from "express";
import { findDevice } from "../services/deviceService";
import { DeviceNoICCIDStatus } from "../models/DeviceNoICCIDStatus";
import { Deviceiccid } from "../models/DeviceStatus";

export const getDevice = async (req: Request, res: Response): Promise<void> => {
  const serial = Array.isArray(req.query.serialNumber)
    ? req.query.serialNumber.join(",")
    : String(req.query.serialNumber);

  const deviceStatus = new Deviceiccid(serial, null, null);

  if (!deviceStatus.isValid()) {
    res.status(400).json("Número de série inválido");
    return;
  }

  try {
    const device = await findDevice(serial);
    const serialNumber = device?.serialNumber || serial;
    const iccid = device?.config?.iccid ?? null;
    const lastMessageTimestamp = device?.status?.lastMessageTimestamp ?? null;

    const finalDevice = new DeviceNoICCIDStatus(serialNumber, iccid, lastMessageTimestamp);

    if (!device || !finalDevice.hasValidData()) {
      res.status(400).json({
        serialNumber,
        iccid: iccid ?? "ICCID não encontrado",
        lastMessageTimestamp: "Sem última atualização",
      });
      return;
    }

    res.status(200).json({
      serialNumber: finalDevice.serialNumber,
      iccid: finalDevice.iccid,
      lastMessageTimestamp: finalDevice.getLastMessageAgeInDays(),
    });
  } catch (error: any) {
    console.error("Erro ao consultar API:", error?.response?.data || error.message);
    res.status(500).json("Erro interno no servidor.");
  }
};
