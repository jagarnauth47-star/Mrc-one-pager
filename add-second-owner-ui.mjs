import fs from "node:fs";

const path = new URL("./assets/index-BIbDezYe.js", import.meta.url);
let code = fs.readFileSync(path, "utf8");

const lookup = "$w(n.make,n.year,n.model,n.fuelType,n.trim)";
const darkOld = `a.jsxs("div",{style:{fontSize:"11px",color:"#8899aa",marginTop:"12px",lineHeight:"1.5"},children:[${lookup}.note," Source: ",${lookup}.source||"OEM warranty documentation"," · verified ",${lookup}.verifiedOn||"status unavailable"]})`;
const darkNew = `a.jsxs("div",{style:{fontSize:"11px",color:"#8899aa",marginTop:"12px",lineHeight:"1.5"},children:[a.jsxs("div",{style:{marginBottom:"7px",padding:"9px 11px",background:"rgba(96,165,250,0.08)",border:"1px solid rgba(96,165,250,0.18)",borderRadius:"8px"},children:[a.jsx("strong",{style:{color:"#c8d6e5"},children:"Subsequent owner: "}),${lookup}.secondOwner]}),a.jsxs("div",{children:[${lookup}.note," ",${lookup}.secondOwnerSourceUrl&&a.jsx("a",{href:${lookup}.secondOwnerSourceUrl,target:"_blank",rel:"noopener noreferrer",style:{color:"#60a5fa",textDecoration:"underline"},children:"View official warranty terms"})," · verified ",${lookup}.verifiedOn||"status unavailable"]})]})`;

const printOld = `a.jsxs("div",{style:{fontSize:"9px",color:"#64748b",lineHeight:"1.45"},children:[${lookup}.note," Source: ",${lookup}.source||"OEM warranty documentation"," · verified ",${lookup}.verifiedOn||"status unavailable"]})`;
const printNew = `a.jsxs("div",{style:{fontSize:"9px",color:"#64748b",lineHeight:"1.45"},children:[a.jsxs("div",{style:{marginBottom:"6px",padding:"7px 9px",background:"#f8fafc",border:"1px solid #cbd5e1",borderRadius:"6px",fontSize:"10px"},children:[a.jsx("strong",{style:{color:"#334155"},children:"Subsequent owner: "}),${lookup}.secondOwner]}),a.jsxs("div",{children:[${lookup}.note," ",${lookup}.secondOwnerSourceUrl&&a.jsx("a",{href:${lookup}.secondOwnerSourceUrl,target:"_blank",rel:"noopener noreferrer",style:{color:"#2563eb",textDecoration:"underline"},children:"View official warranty terms"})," · verified ",${lookup}.verifiedOn||"status unavailable"]})]})`;

if (code.includes("Subsequent owner: ")) {
  console.log("Subsequent-owner UI is already present.");
  process.exit(0);
}
if (!code.includes(darkOld)) throw new Error("Could not locate results warranty source block.");
if (!code.includes(printOld)) throw new Error("Could not locate printable warranty source block.");

code = code.replace(darkOld, darkNew).replace(printOld, printNew);
fs.writeFileSync(path, code);
console.log("Added subsequent-owner terms and official OEM links to both warranty panels.");
