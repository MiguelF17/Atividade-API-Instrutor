import express from "express";

import instrutoresRoutes from "./routes/instrutorRoutes";
import cursosRoutes from "./routes/cursoRoutes";

const app = express();

app.use(express.json());

app.use("/instrutores", instrutoresRoutes);
app.use("/cursos", cursosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});