import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

export default router;

/* Criar instrutor */
router.post("/", async (req, res) => {
  try {
    const { nome, email } = req.body;

    const instrutor = await prisma.instrutor.create({
      data: {
        nome,
        email,
      },
    });

    res.status(201).json(instrutor);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao cadastrar instrutor",
    });
  }
});

/* Buscar instrutor */

router.get("/", async (req, res) => {
  try {
    const instrutores = await prisma.instrutor.findMany({
      include: {
        cursos: true,
      },
    });

    res.json(instrutores);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar instrutores",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const instrutor = await prisma.instrutor.findUnique({
      where: {
        id: id,
      },
      include: {
        cursos: true,
      },
    });

    if (!instrutor) {
      return res.status(404).json({
        erro: "Instrutor não encontrado",
      });
    }

    res.json(instrutor);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar instrutor",
    });
  }
});

/* atualizar instrutor */
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, email } = req.body;

    const instrutor = await prisma.instrutor.update({
      where: {
        id: id,
      },
      data: {
        nome,
        email,
      },
    });

    res.json(instrutor);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar instrutor",
    });
  }
});

/* deletar instrutor */

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.instrutor.delete({
      where: {
        id: id,
      },
    });

    res.json({
      mensagem: "Instrutor removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao remover instrutor",
    });
  }
});
