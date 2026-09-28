import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

/* criar curso */

router.post("/", async (req, res) => {
    try {
        const { titulo, descricao, instrutor_id } = req.body;

        const curso = await prisma.curso.create({
            data: {
                titulo,
                descricao,
                instrutor_id
            }
        });

        res.status(201).json(curso);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar curso"
        });
    }
});

/* buscar curso */

router.get("/", async (req, res) => {
    try {
        const cursos = await prisma.curso.findMany({
            include: {
                instrutor: true
            }
        });

        res.json(cursos);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar cursos"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const curso = await prisma.curso.findUnique({
            where: {
                id: id
            },
            include: {
                instrutor: true
            }
        });

        if (!curso) {
            return res.status(404).json({
                erro: "Curso não encontrado"
            });
        }

        res.json(curso);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar curso"
        });
    }
});

/* atualizar curso */

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { titulo, descricao, instrutor_id } = req.body;

        const curso = await prisma.curso.update({
            where: {
                id: id
            },
            data: {
                titulo,
                descricao,
                instrutor_id
            }
        });

        res.json(curso);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar curso"
        });
    }
});


/* deletar curso */
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.curso.delete({
            where: {
                id: id
            }
        });

        res.json({
            mensagem: "Curso removido com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao remover curso"
        });
    }
});

export default router;