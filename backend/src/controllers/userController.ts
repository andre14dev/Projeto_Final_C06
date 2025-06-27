import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return;}

  try {
    if (
      username === 'admin@com'  &&
      password === 'admin'
    ) {
      res.status(200).json({ message: 'Login bem-sucedido'});
    } else {
      res.status(401).json({ message: "Email ou senha incorretos!" });
      return;
    }

  } catch (error: any) {
    console.error("Erro ao consultar API:", error?.response?.data || error.message);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
