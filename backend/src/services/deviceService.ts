import dispositivos from "../data/device";

export async function findDevice(serial: string): Promise<any> {
  const list = dispositivos as any[];
  const device = list.find((d: any) => d.serial === serial);

  if (!device) {
    return null;
  }

  return {
    serialNumber: device.serial,
    config: { iccid: device.iccid },
    status: { lastMessageTimestamp: device.lastMessageTimestamp },
  };
} 