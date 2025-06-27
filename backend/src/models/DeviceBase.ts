export abstract class DeviceBase {
  serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  isValid(): boolean {
    const regex = /^\d{0,50}$/;
    return regex.test(this.serialNumber);
  }
}
