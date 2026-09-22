import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("./warranty-db.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const db = sandbox.window.__MRC_WARRANTY_DB__;
const lookup = sandbox.window.__MRC_WARRANTY_LOOKUP__;
assert(db && typeof lookup === "function", "Database did not initialize");

const ids = new Set();
for (const item of db.rules) {
  assert(!ids.has(item.id), `Duplicate rule id: ${item.id}`);
  ids.add(item.id);
  assert(item.from >= 2012 && item.to <= db.modelYearEnd && item.from <= item.to, `Invalid years: ${item.id}`);
  assert(db.sources[item.sourceId], `Missing source: ${item.id}`);
  assert(/^https:\/\//.test(db.sources[item.sourceId].url), `Non-HTTPS source: ${item.id}`);
  assert(item.basic && item.basic.months > 0, `Missing basic coverage: ${item.id}`);
  assert(item.powertrain || item.evBattery || item.powertrainText, `Missing powertrain/EV coverage: ${item.id}`);
}

const makes = new Set(db.rules.flatMap((item) => item.makes));
assert(makes.size >= 45, `Expected at least 45 makes, found ${makes.size}`);

const expected = [
  [{ year: 2015, make: "Chevrolet", model: "Malibu" }, "3 years / 36,000 miles", "5 years / 100,000 miles"],
  [{ year: 2016, make: "Chevrolet", model: "Malibu" }, "3 years / 36,000 miles", "5 years / 60,000 miles"],
  [{ year: 2018, make: "Volkswagen", model: "Jetta" }, "6 years / 72,000 miles", "6 years / 72,000 miles"],
  [{ year: 2021, make: "Volkswagen", model: "Tiguan" }, "4 years / 50,000 miles", "4 years / 50,000 miles"],
  [{ year: 2025, make: "Honda", model: "CR-V" }, "3 years / 36,000 miles", "5 years / 60,000 miles"],
  [{ year: 2025, make: "Kia", model: "Telluride" }, "5 years / 60,000 miles", "10 years / 100,000 miles"],
  [{ year: 2024, make: "Tesla", model: "Model 3", trim: "Long Range AWD" }, "4 years / 50,000 miles", "8 years / 120,000 miles"],
  [{ year: 2024, make: "Tesla", model: "Model 3", trim: "Rear-Wheel Drive" }, "4 years / 50,000 miles", "8 years / 100,000 miles"],
  [{ year: 2025, make: "Rivian", model: "R1S", trim: "Quad Motor" }, "5 years / 60,000 miles", "Battery/drive configuration verification required"],
];

for (const [vehicle, basic, powertrain] of expected) {
  const result = lookup(vehicle);
  assert.equal(result.status, "verified", JSON.stringify(vehicle));
  assert.equal(result.basic, basic, JSON.stringify(vehicle));
  assert.equal(result.powertrain, powertrain, JSON.stringify(vehicle));
  assert(result.sourceUrl && result.verifiedOn, `Missing traceability: ${JSON.stringify(vehicle)}`);
}

assert.equal(lookup({ year: 2011, make: "Honda", model: "Accord" }).status, "unverified");
assert.equal(lookup({ year: 2025, make: "Unknown Motors", model: "Example" }).status, "unverified");
assert.equal(lookup({ year: 2024, make: "Tesla", model: "Model 3" }).powertrain, "Configuration verification required");

console.log(`Validated ${db.rules.length} warranty rules across ${makes.size} makes.`);
