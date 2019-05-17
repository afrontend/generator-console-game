"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("babel"); // This method adds support for a `--babel` flag
  }

  prompting() {
    this.log(
      yosay(`Welcome ${chalk.red("generator-console-game")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "id",
        message: "Your github id",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const fileList = [
      "src",
      "lib",
      ".editorconfig",
      ".eslintignore",
      ".gitattributes",
      ".gitignore",
      ".travis.yml",
      ".yo-rc.json",
      "README.md",
      "package.json"
    ];

    fileList.forEach(fileName => {
      this.fs.copyTpl(
        this.templatePath(fileName),
        this.destinationPath(fileName),
        this.props
      );
    });
  }

  install() {
    this.installDependencies();
  }
};
