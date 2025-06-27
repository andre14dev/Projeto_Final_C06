import { DeviceBase } from "./DeviceBase";

export class Deviceiccid extends DeviceBase {
  iccid: string | null;
  lastMessageTimestamp: number | null;

  constructor(serialNumber: string, iccid: string | null, lastMessageTimestamp: number | null) {
    super(serialNumber);
    this.iccid = iccid;
    this.lastMessageTimestamp = lastMessageTimestamp;
  }

  getLastMessageAgeInDays(): string {
    if (!this.lastMessageTimestamp) return "Sem última atualização";

    const now = new Date();
    const lastUpdate = new Date(this.lastMessageTimestamp);
    const diffInMs = now.getTime() - lastUpdate.getTime();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffInDays = Math.floor(diffInMs / MS_PER_DAY);

    return `${diffInDays} dia${diffInDays !== 1 ? "s" : ""}`;
  }

  hasValidData(): boolean {
    return !!this.iccid && !!this.lastMessageTimestamp;
  }
}
