import fs from "node:fs";

const bundlePath = new URL("./assets/index-BIbDezYe.js", import.meta.url);
let bundle = fs.readFileSync(bundlePath, "utf8");

if (bundle.includes("Typical Factory Warranty")) {
  console.log("Factory warranty comparison is already present.");
  process.exit(0);
}

const replaceOnce = (needle, replacement, label) => {
  const count = bundle.split(needle).length - 1;
  if (count !== 1) throw new Error(`${label}: expected 1 match, found ${count}`);
  bundle = bundle.replace(needle, replacement);
};

const warrantyHelper = `function $w(e,t){const n=String(e||"").toUpperCase(),r=Number(t)||0,l={basic:"3 years / 36,000 miles",powertrain:"5 years / 60,000 miles",note:"Typical original new-vehicle coverage."};if(["HYUNDAI","KIA","GENESIS","MITSUBISHI"].some(o=>n.includes(o)))return{basic:"5 years / 60,000 miles",powertrain:"10 years / 100,000 miles*",note:"*Powertrain coverage and transfer terms vary by owner; verify eligibility."};if(n.includes("VOLKSWAGEN"))return r===2018||r===2019?{basic:"6 years / 72,000 miles",powertrain:"6 years / 72,000 miles",note:"Typical People First Warranty for eligible 2018–2019 models."}:{basic:"4 years / 50,000 miles",powertrain:"4 years / 50,000 miles",note:"Typical original new-vehicle coverage."};if(["BMW","MERCEDES-BENZ","AUDI","VOLVO","PORSCHE","LAND ROVER","JAGUAR","MINI","RIVIAN","TESLA"].some(o=>n.includes(o)))return{basic:"4 years / 50,000 miles",powertrain:"4 years / 50,000 miles",note:"Typical original new-vehicle coverage; EV battery coverage is separate."};if(["LEXUS","ACURA","INFINITI","CADILLAC","LINCOLN"].some(o=>n.includes(o)))return{basic:"4 years / 50,000 miles",powertrain:"6 years / 70,000 miles",note:"Typical original new-vehicle coverage."};return l}`;

replaceOnce(
  "Zl.createRoot(document.getElementById(\"root\"))",
  `${warrantyHelper};Zl.createRoot(document.getElementById("root"))`,
  "warranty helper insertion",
);

const darkAnchor = `it.length>0&&a.jsxs("div",{style:{background:"rgba(251,146,60,0.08)"`;
const darkPanel = `a.jsxs("div",{style:{background:"rgba(37,99,235,0.08)",border:"1px solid rgba(96,165,250,0.25)",borderRadius:"14px",padding:"24px",marginBottom:"20px"},children:[a.jsx("h3",{style:{fontSize:"14px",textTransform:"uppercase",letterSpacing:"1.2px",color:"#60a5fa",marginTop:0,marginBottom:"14px"},children:"🛡️ Typical Factory Warranty"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",gap:"12px"},children:[a.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"14px"},children:[a.jsx("div",{style:{fontSize:"11px",color:"#8899aa",textTransform:"uppercase",letterSpacing:".8px",marginBottom:"5px"},children:"Basic / Bumper-to-Bumper"}),a.jsx("div",{style:{fontSize:"18px",fontWeight:"700",color:"#e2e8f0"},children:$w(n.make,n.year).basic})]}),a.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"14px"},children:[a.jsx("div",{style:{fontSize:"11px",color:"#8899aa",textTransform:"uppercase",letterSpacing:".8px",marginBottom:"5px"},children:"Powertrain"}),a.jsx("div",{style:{fontSize:"18px",fontWeight:"700",color:"#e2e8f0"},children:$w(n.make,n.year).powertrain})]})]}),a.jsxs("div",{style:{fontSize:"11px",color:"#8899aa",marginTop:"12px",lineHeight:"1.5"},children:[$w(n.make,n.year).note," Coverage begins on the original in-service date and may already be expired by time or mileage. Verify remaining coverage by VIN with the manufacturer."]})]}),`;
replaceOnce(darkAnchor, `${darkPanel}${darkAnchor}`, "results warranty panel");

const lightAnchor = `),(ke||c||y&&y.overall)&&a.jsxs("div",{style:{marginBottom:"20px"}`;
const lightPanel = `),a.jsxs("div",{style:{background:"#eff6ff",border:"1px solid #93c5fd",borderRadius:"10px",padding:"16px 20px",marginBottom:"20px"},children:[a.jsx("div",{style:{fontSize:"14px",fontWeight:"700",color:"#1e3a5f",marginBottom:"10px"},children:"🛡️ Typical Factory Warranty"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"8px"},children:[a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"10px",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:".5px"},children:"Basic / Bumper-to-Bumper"}),a.jsx("div",{style:{fontSize:"15px",fontWeight:"700",color:"#1e40af"},children:$w(n.make,n.year).basic})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"10px",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:".5px"},children:"Powertrain"}),a.jsx("div",{style:{fontSize:"15px",fontWeight:"700",color:"#1e40af"},children:$w(n.make,n.year).powertrain})]})]}),a.jsxs("div",{style:{fontSize:"9px",color:"#64748b",lineHeight:"1.45"},children:[$w(n.make,n.year).note," Coverage begins on the original in-service date and may already be expired by time or mileage. Verify remaining coverage by VIN with the manufacturer."]})]}),(ke||c||y&&y.overall)&&a.jsxs("div",{style:{marginBottom:"20px"}`;
replaceOnce(lightAnchor, lightPanel, "one-pager warranty panel");

fs.writeFileSync(bundlePath, bundle);
console.log("Added factory warranty comparison to results and one-pager views.");
