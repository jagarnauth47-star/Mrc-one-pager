import fs from "node:fs";

const bundlePath = new URL("./assets/index-BIbDezYe.js", import.meta.url);
let bundle = fs.readFileSync(bundlePath, "utf8");

const lookupFunction = 'function $w(e,t,n,r,i){const l=window.__MRC_WARRANTY_LOOKUP__;';
const linkFunction = 'function Ew(e,t,n){const r=l=>String(l||"").trim().toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return `https://www.edmunds.com/${r(e)}/${r(n)}/${encodeURIComponent(t)}/cost-to-own/`}';

if (!bundle.includes(linkFunction)) {
  if (!bundle.includes(lookupFunction)) {
    throw new Error("Could not locate the warranty lookup function.");
  }
  bundle = bundle.replace(lookupFunction, `${linkFunction}${lookupFunction}`);
}

const interactiveOld = 'a.jsxs("div",{style:{fontSize:"11px",color:"#8899aa",marginTop:"12px",lineHeight:"1.5"},children:[$w(n.make,n.year,n.model,n.fuelType,n.trim).note," Source: ",$w(n.make,n.year,n.model,n.fuelType,n.trim).source||"OEM warranty documentation"," · verified ",$w(n.make,n.year,n.model,n.fuelType,n.trim).verifiedOn||"status unavailable"]})]}),it.length>0';
const interactiveNew = 'a.jsxs("div",{style:{fontSize:"11px",color:"#8899aa",marginTop:"12px",lineHeight:"1.5"},children:[$w(n.make,n.year,n.model,n.fuelType,n.trim).note," Source: ",$w(n.make,n.year,n.model,n.fuelType,n.trim).source||"OEM warranty documentation"," · verified ",$w(n.make,n.year,n.model,n.fuelType,n.trim).verifiedOn||"status unavailable"]}),a.jsx("a",{href:Ew(n.make,n.year,n.model),target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",marginTop:"14px",padding:"10px 14px",borderRadius:"8px",background:"#2563eb",color:"#fff",fontSize:"12px",fontWeight:"700",textDecoration:"none"},children:"View Cost to Own on Edmunds ↗"}),a.jsx("div",{style:{fontSize:"10px",color:"#64748b",marginTop:"8px",lineHeight:"1.45"},children:"Edmunds is an independent third-party source. Cost-to-own data availability and estimates may vary by year, trim, configuration, and location."})]}),it.length>0';

if (!bundle.includes(interactiveNew)) {
  if (!bundle.includes(interactiveOld)) {
    throw new Error("Could not locate the interactive warranty card.");
  }
  bundle = bundle.replace(interactiveOld, interactiveNew);
}

const printOld = 'a.jsxs("div",{style:{fontSize:"9px",color:"#64748b",lineHeight:"1.45"},children:[$w(n.make,n.year,n.model,n.fuelType,n.trim).note," Source: ",$w(n.make,n.year,n.model,n.fuelType,n.trim).source||"OEM warranty documentation"," · verified ",$w(n.make,n.year,n.model,n.fuelType,n.trim).verifiedOn||"status unavailable"]})]}),(ke||c||y&&y.overall)';
const printNew = 'a.jsxs("div",{style:{fontSize:"9px",color:"#64748b",lineHeight:"1.45"},children:[$w(n.make,n.year,n.model,n.fuelType,n.trim).note," Source: ",$w(n.make,n.year,n.model,n.fuelType,n.trim).source||"OEM warranty documentation"," · verified ",$w(n.make,n.year,n.model,n.fuelType,n.trim).verifiedOn||"status unavailable"]}),a.jsx("a",{href:Ew(n.make,n.year,n.model),target:"_blank",rel:"noopener noreferrer",style:{display:"inline-block",marginTop:"8px",fontSize:"10px",fontWeight:"700",color:"#1d4ed8",textDecoration:"underline"},children:"View Cost to Own on Edmunds ↗"}),a.jsx("div",{style:{fontSize:"8px",color:"#64748b",marginTop:"4px",lineHeight:"1.35"},children:"Edmunds is an independent third-party source. Cost-to-own data availability and estimates may vary by year, trim, configuration, and location."})]}),(ke||c||y&&y.overall)';

if (!bundle.includes(printNew)) {
  if (!bundle.includes(printOld)) {
    throw new Error("Could not locate the printable warranty card.");
  }
  bundle = bundle.replace(printOld, printNew);
}

fs.writeFileSync(bundlePath, bundle);
console.log("Added Edmunds Cost to Own links to the interactive and printable warranty sections.");
