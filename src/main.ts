import fs from "node:fs";
import path from "node:path";
import { Resource, User } from "./types";

const usuarios: User[] = [
  {
    id: "cfarias",
  },
];

const recursos: Resource[] = [{ id: "publicaciones" }, { id: "comentarios" }];

const archivoPoliticas = fs.readFileSync(path.resolve("src", "policies.txt"), {
  encoding: "utf-8",
});

const lineasPoliticas = archivoPoliticas.split("\n");

for (const lineaPolitica of lineasPoliticas) {
  if (lineaPolitica.startsWith("#")) {
    continue;
  }
  console.info(`- ${lineaPolitica}`);
}

console.info("OK");
