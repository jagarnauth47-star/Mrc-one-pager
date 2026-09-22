import fs from "node:fs";

const path = new URL("./assets/index-BIbDezYe.js", import.meta.url);
let code = fs.readFileSync(path, "utf8");
const oldText = `children:[$w(n.make,n.year,n.model,n.fuelType).note," Source: "]`;
const newText = `children:[$w(n.make,n.year,n.model,n.fuelType).note," Source: ",$w(n.make,n.year,n.model,n.fuelType).source||"OEM warranty documentation"," · verified ",$w(n.make,n.year,n.model,n.fuelType).verifiedOn||"status unavailable"]`;
const count = code.split(oldText).length - 1;
if (count !== 2) throw new Error(`Expected two warranty source labels, found ${count}.`);
code = code.replaceAll(oldText, newText);
fs.writeFileSync(path, code);
console.log("Added source and verification metadata to both warranty panels.");
