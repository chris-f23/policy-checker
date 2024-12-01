import fs from "node:fs";
import path from "node:path";
import { Resource, User } from "./types";
import { PolicyResolver } from "./PolicyResolver";

const usuarios: User[] = [
  {
    id: "cfarias",
  },
  {
    id: "dbravo",
  },
];

type Historia = {
  id: string;
  titulo: string;
  creado_por: string;
};

const historias: Historia[] = [
  { id: "123", titulo: "Hola mundo", creado_por: "cfarias" },
  {
    id: "124",
    titulo: "Top 5 mejores tarjetas gráficas 2022",
    creado_por: "dbravo",
  },
];

type Comentario = {
  texto: string;
  creado_por: string;
  id_historia: string;
};

const comentarios: Comentario[] = [
  {
    creado_por: "cfarias",
    id_historia: "124",
    texto: "Buena historia!",
  },
];

const textoPoliticas = fs.readFileSync(path.resolve("src", "policies.txt"), {
  encoding: "utf-8",
});

const resolver = new PolicyResolver(textoPoliticas);
console.info(resolver.policies);
