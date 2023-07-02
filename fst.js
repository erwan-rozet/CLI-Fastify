#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");

program.version("1.0.0").description("CLI to create a new Fastify module");

program
  .command("create <moduleName>")
  .description("Create a new module with associated files")
  .action((moduleName) => {
    const moduleDirectory = path.join(__dirname, moduleName);
    // Vérifier si le module existe déjà
    if (fs.existsSync(moduleDirectory)) {
      console.error(
        `\n ⚠️   Choose another module name, ${moduleName} already exists. \n`
      );
      return;
    }
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

    console.log(`${moduleName} module successfully created.`);
  });

program.parse(process.argv);
