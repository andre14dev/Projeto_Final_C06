export class DeviceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Dispositivo Nao Encontrado Error';
  }
}


