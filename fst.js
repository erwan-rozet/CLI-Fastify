#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");

program
  .version("1.0.0")
  .description("CLI pour créer un nouveau module Fastify");

program
  .command("create <moduleName>")
  .description("Crée un nouveau module avec les fichiers associés")
  .action((moduleName) => {
    const moduleDirectory = path.join(__dirname, moduleName);
    fs.mkdirSync(moduleDirectory);

    const templateDirectory = path.join(__dirname, "templates");

    const templateFiles = fs.readdirSync(templateDirectory);

    templateFiles.forEach((templateFile) => {
      const templateFilePath = path.join(templateDirectory, templateFile);
      const fileContent = fs.readFileSync(templateFilePath, "utf8");
      const fileName = templateFile
        .replace(".template", "")
        .replace("{moduleName}", moduleName);
      const filePath = path.join(moduleDirectory, fileName);
      fs.writeFileSync(filePath, fileContent);
    });

    console.log(`Le module ${moduleName} a été créé avec succès.`);
  });

program.parse(process.argv);
