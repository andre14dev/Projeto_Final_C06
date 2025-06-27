import { Deviceiccid } from "./DeviceStatus";

export class DeviceNoICCIDStatus extends Deviceiccid {
  constructor(serialNumber: string, iccid: string | null, lastMessageTimestamp: number | null) {
    super(serialNumber, iccid, lastMessageTimestamp);
  }

  override hasValidData(): boolean {
    return !!this.lastMessageTimestamp;
  }

  override getLastMessageAgeInDays(): string {
    const dias = super.getLastMessageAgeInDays();
    return `${dias} `;
  }
}
