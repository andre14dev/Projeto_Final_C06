import { promises as fs } from 'fs';
import path from 'path';

export async function lerDispositivosDoArquivo(): Promise<any[]> {
  const filePath = path.join(__dirname, '..', 'data', 'dispositivos.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o arquivo de dispositivos:', error);
    throw new Error('Falha ao carregar os dispositivos');
  }
}
