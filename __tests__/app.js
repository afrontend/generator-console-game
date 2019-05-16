"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-console-game:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["package.json"]);
  });
});
