import fs from "node:fs";

const path = new URL("./assets/index-BIbDezYe.js", import.meta.url);
let code = fs.readFileSync(path, "utf8");

const helperPattern = /function \$w\([^)]*\)\{.*?\};Zl\.createRoot/;
const helper = `function $w(e,t,n,r,i){const l=window.__MRC_WARRANTY_LOOKUP__;return typeof l==="function"?l({make:e,year:t,model:n,fuelType:r,trim:i}):{status:"unverified",basic:"Not verified",powertrain:"Not verified",powertrainLabel:"Powertrain / EV System",note:"Warranty database did not load."}};Zl.createRoot`;

if (!helperPattern.test(code)) throw new Error("Could not locate the existing warranty helper.");
code = code.replace(helperPattern, helper);
code = code.replaceAll("$w(n.make,n.year)", "$w(n.make,n.year,n.model,n.fuelType)");
code = code.replaceAll("$w(n.make,n.year,n.model,n.fuelType)", "$w(n.make,n.year,n.model,n.fuelType,n.trim)");
code = code.replaceAll("Typical Factory Warranty", "Original Factory Warranty");
code = code.replaceAll("Powertrain\"}),a.jsx", "Powertrain / EV System\"}),a.jsx");
code = code.replaceAll(
  " Coverage begins on the original in-service date and may already be expired by time or mileage. Verify remaining coverage by VIN with the manufacturer.",
  " Source: ",
);

fs.writeFileSync(path, code);
console.log("Connected the UI to the audited local warranty database.");
