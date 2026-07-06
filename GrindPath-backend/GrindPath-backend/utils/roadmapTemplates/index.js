// Template Registry — single import point for all domain templates.
// To add a new domain: create a new file (e.g. flutter.js) and add one line here.
// The roadmapGenerator.js and controllers never need to change.

const mern  = require("./mern");
const java  = require("./java");
const genai = require("./genai");
const dsa   = require("./dsa");
const cloud = require("./cloud");

const TEMPLATES = {
  mern,
  java,
  genai,
  dsa,
  cloud
};

module.exports = TEMPLATES;
