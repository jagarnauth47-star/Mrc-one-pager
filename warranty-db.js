(function () {
  "use strict";

  const CURRENT_MODEL_YEAR = 2027;
  const VERIFIED_ON = "2026-09-17";

  const sources = {
    honda: { title: "Honda warranty booklets", url: "https://owners.honda.com/vehicle-information/warranty" },
    acura: { title: "Acura warranty information", url: "https://owners.acura.com/vehicle-information/warranty" },
    toyota: { title: "Toyota warranty and maintenance guides", url: "https://www.toyota.com/owners/warranty-owners-manuals/" },
    lexus: { title: "Lexus warranty and services guides", url: "https://www.lexus.com/My-Lexus/resources/manuals-warranties" },
    ford: { title: "Ford warranty guides", url: "https://www.ford.com/support/owner-manuals/" },
    gm: { title: "GM manuals, guides, and warranty details", url: "https://experience.gm.com/support/vehicle/manuals-guides" },
    mopar: { title: "Mopar warranty information and owner manuals", url: "https://www.mopar.com/en-us/care/warranty.html" },
    hyundai: { title: "Hyundai new vehicle warranty", url: "https://www.hyundaiusa.com/us/en/assurance/america-best-warranty" },
    kia: { title: "Kia warranty coverage", url: "https://www.kia.com/us/en/warranty" },
    genesis: { title: "Genesis warranty information", url: "https://www.genesis.com/us/en/owners/ownership/warranty.html" },
    nissan: { title: "Nissan warranty information booklets", url: "https://www.nissanusa.com/owners/ownership/warranty.html" },
    infiniti: { title: "INFINITI warranty information", url: "https://www.infinitiusa.com/owners/ownership/warranty.html" },
    mazda: { title: "Mazda warranty information", url: "https://www.mazdausa.com/owners/warranty" },
    subaru: { title: "Subaru warranty and maintenance booklets", url: "https://techinfo.subaru.com/stis/doc/warrantyBooklet.html" },
    mitsubishi: { title: "Mitsubishi warranty information", url: "https://www.mitsubishicars.com/owners/service/warranty" },
    vw: { title: "Volkswagen warranty information", url: "https://www.vw.com/en/owners-and-services/about-my-vehicle/warranty.html" },
    audi: { title: "Audi warranty and owner literature", url: "https://www.audiusa.com/en/support/help/vehicle-warranty/" },
    bmw: { title: "BMW warranty information", url: "https://www.bmwusa.com/explore/bmw-value/bmw-ultimate-service/service-and-warranty-books.html" },
    mercedes: { title: "Mercedes-Benz warranty manuals", url: "https://www.mbusa.com/en/owners/manuals" },
    volvo: { title: "Volvo warranty information", url: "https://volvo.custhelp.com/app/manuals/OwnersManual/" },
    jlr: { title: "Jaguar and Land Rover owner handbooks and warranty guides", url: "https://www.jaguarusa.com/ownership/index.html" },
    porsche: { title: "Porsche warranty information", url: "https://www.porsche.com/usa/accessoriesandservices/porscheservice/vehicleinformation/warranty/" },
    tesla: { title: "Tesla vehicle warranty", url: "https://www.tesla.com/support/vehicle-warranty" },
    polestar: { title: "Polestar warranty", url: "https://www.polestar.com/us/manual/polestar-2/2025/article/2a715148681ea79bc0a801510da10aa5/" },
    rivian: { title: "Rivian new vehicle limited warranty", url: "https://rivian.com/support/article/what-is-the-new-vehicle-limited-warranty" },
    lucid: { title: "Lucid new vehicle limited warranty", url: "https://lucidmotors.com/legal/vehicle-warranty" },
    vinfast: { title: "VinFast vehicle warranty", url: "https://vinfastauto.us/ownership/warranty" },
    ineos: { title: "INEOS Grenadier new vehicle warranty", url: "https://ineosgrenadier.com/en/us/vehicle-warranty" },
    karma: { title: "Karma Automotive manufacturer warranty", url: "https://karmaautomotive.com/" },
    suzuki: { title: "Suzuki Auto warranty information", url: "https://www.suzukiauto.com/owners/warranty" },
    maserati: { title: "Maserati new vehicle warranty", url: "https://www.maserati.com/us/en/ownership/warranty" },
    astonMartin: { title: "Aston Martin warranty", url: "https://www.astonmartin.com/en-us/owners/warranty" },
    bentley: { title: "Bentley warranty", url: "https://www.bentleymotors.com/en/your-bentley/service-and-maintenance/warranty.html" },
    ferrari: { title: "Ferrari manufacturer warranty", url: "https://www.ferrari.com/en-US/auto/car-part-services" },
    lamborghini: { title: "Lamborghini warranty", url: "https://www.lamborghini.com/en-en/ownership/warranty" },
    mclaren: { title: "McLaren vehicle warranty", url: "https://cars.mclaren.com/us-en/ownership/service-and-maintenance" },
    lotus: { title: "Lotus warranty", url: "https://www.lotuscars.com/en-US/ownership" }
  };

  const coverage = (months, miles) => ({ months, miles });
  const rule = (id, makes, from, to, basic, powertrain, sourceId, extra = {}) => ({
    id, makes, from, to, basic, powertrain, sourceId, verifiedOn: VERIFIED_ON, ...extra
  });

  // Basic and powertrain coverage are the original U.S. new-vehicle terms.
  // Separate EV/hybrid battery terms are included when a conventional
  // powertrain warranty does not accurately describe the vehicle.
  const rules = [
    rule("honda-2012-plus", ["HONDA"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "honda"),
    rule("acura-2012-plus", ["ACURA"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(72, 70000), "acura"),
    rule("toyota-2012-plus", ["TOYOTA"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "toyota"),
    rule("scion-2012-2016", ["SCION"], 2012, 2016, coverage(36, 36000), coverage(60, 60000), "toyota"),
    rule("lexus-2012-plus", ["LEXUS"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(72, 70000), "lexus"),

    rule("ford-2012-plus", ["FORD"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "ford", { note: "Diesel engine coverage can extend to 5 years/100,000 miles." }),
    rule("lincoln-2012-plus", ["LINCOLN"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(72, 70000), "ford"),

    rule("chevy-gmc-2012-2015", ["CHEVROLET", "GMC"], 2012, 2015, coverage(36, 36000), coverage(60, 100000), "gm"),
    rule("chevy-gmc-2016-plus", ["CHEVROLET", "GMC"], 2016, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "gm", { note: "Eligible light-duty diesel engines may carry longer engine coverage." }),
    rule("buick-2012-2015", ["BUICK"], 2012, 2015, coverage(48, 50000), coverage(60, 100000), "gm"),
    rule("buick-2016-2019", ["BUICK"], 2016, 2019, coverage(48, 50000), coverage(72, 70000), "gm"),
    rule("buick-2020-plus", ["BUICK"], 2020, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "gm"),
    rule("cadillac-2012-2015", ["CADILLAC"], 2012, 2015, coverage(48, 50000), coverage(60, 100000), "gm"),
    rule("cadillac-2016-plus", ["CADILLAC"], 2016, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(72, 70000), "gm"),

    rule("stellantis-2012-2015", ["CHRYSLER", "DODGE", "JEEP", "RAM"], 2012, 2015, coverage(36, 36000), coverage(60, 100000), "mopar"),
    rule("stellantis-2016-plus", ["CHRYSLER", "DODGE", "JEEP", "RAM"], 2016, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "mopar", { note: "Certain diesel engines have separate longer coverage." }),
    rule("fiat-2012-plus", ["FIAT"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "mopar"),
    rule("alfa-2017-plus", ["ALFA ROMEO"], 2017, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "mopar"),

    rule("hyundai-2012-plus", ["HYUNDAI"], 2012, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(120, 100000), "hyundai", { note: "The 10-year/100,000-mile powertrain warranty is subject to original-owner and usage terms." }),
    rule("kia-2012-plus", ["KIA"], 2012, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(120, 100000), "kia", { note: "The 10-year/100,000-mile powertrain warranty is subject to original-owner and usage terms." }),
    rule("genesis-2017-plus", ["GENESIS"], 2017, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(120, 100000), "genesis", { note: "The 10-year/100,000-mile powertrain warranty is subject to original-owner and usage terms." }),
    rule("mitsubishi-2012-plus", ["MITSUBISHI"], 2012, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(120, 100000), "mitsubishi", { note: "The 10-year/100,000-mile powertrain warranty is subject to original-owner and usage terms." }),

    rule("nissan-2012-plus", ["NISSAN"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "nissan"),
    rule("infiniti-2012-plus", ["INFINITI"], 2012, CURRENT_MODEL_YEAR, coverage(48, 60000), coverage(72, 70000), "infiniti"),
    rule("mazda-2012-plus", ["MAZDA"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "mazda"),
    rule("subaru-2012-plus", ["SUBARU"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(60, 60000), "subaru"),

    rule("vw-2012-2017", ["VOLKSWAGEN"], 2012, 2017, coverage(36, 36000), coverage(60, 60000), "vw"),
    rule("vw-2018-2019", ["VOLKSWAGEN"], 2018, 2019, coverage(72, 72000), coverage(72, 72000), "vw"),
    rule("vw-2020-plus", ["VOLKSWAGEN"], 2020, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "vw"),
    rule("audi-2012-plus", ["AUDI"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "audi"),
    rule("bmw-2012-plus", ["BMW"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "bmw"),
    rule("mini-2012-plus", ["MINI"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "bmw"),
    rule("mercedes-2012-plus", ["MERCEDES-BENZ", "MERCEDES BENZ"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "mercedes"),
    rule("volvo-2012-plus", ["VOLVO"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "volvo"),
    rule("land-rover-2012-plus", ["LAND ROVER"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "jlr"),
    rule("jaguar-2012-2015", ["JAGUAR"], 2012, 2015, coverage(48, 50000), coverage(48, 50000), "jlr"),
    rule("jaguar-2016-plus", ["JAGUAR"], 2016, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(60, 60000), "jlr"),
    rule("porsche-2012-plus", ["PORSCHE"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "porsche"),

    rule("tesla-model3y-long-range-performance", ["TESLA"], 2017, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "tesla", { models: ["MODEL 3", "MODEL Y"], trimPatterns: ["LONG RANGE", "PERFORMANCE"], evBattery: coverage(96, 120000) }),
    rule("tesla-model3y-standard", ["TESLA"], 2017, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "tesla", { models: ["MODEL 3", "MODEL Y"], trimPatterns: ["REAR WHEEL DRIVE", "RWD", "STANDARD RANGE"], evBattery: coverage(96, 100000) }),
    rule("tesla-model3y-configuration-required", ["TESLA"], 2017, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "tesla", { models: ["MODEL 3", "MODEL Y"], powertrainText: "Configuration verification required", note: "Battery/drive-unit coverage is 8 years; the mileage limit varies by configuration. Confirm the exact trim when the VIN decoder does not provide it." }),
    rule("tesla-modelsx-2020-plus", ["TESLA"], 2020, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "tesla", { models: ["MODEL S", "MODEL X"], evBattery: coverage(96, 150000) }),
    rule("tesla-modelsx-2012-2019", ["TESLA"], 2012, 2019, coverage(48, 50000), null, "tesla", { models: ["MODEL S", "MODEL X"], powertrainText: "Battery configuration verification required", note: "Early Model S/X battery warranties varied by model year and battery configuration; the app will not substitute today's 150,000-mile term." }),
    rule("polestar-2", ["POLESTAR"], 2021, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "polestar", { evBattery: coverage(96, 100000) }),
    rule("rivian-r1-2022-2024", ["RIVIAN"], 2022, 2024, coverage(60, 60000), null, "rivian", { models: ["R1T", "R1S"], powertrainText: "Battery/drive configuration verification required", note: "Battery and drive-system mileage depends on the original battery-pack configuration." }),
    rule("rivian-r1-quad-2025-plus", ["RIVIAN"], 2025, CURRENT_MODEL_YEAR, coverage(60, 60000), null, "rivian", { models: ["R1T", "R1S"], trimPatterns: ["QUAD"], powertrainText: "Battery/drive configuration verification required", note: "Quad-Motor comprehensive coverage shown; battery and drive-system mileage depends on configuration." }),
    rule("rivian-r1-other-2025-plus", ["RIVIAN"], 2025, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "rivian", { models: ["R1T", "R1S"], powertrainText: "Battery/drive configuration verification required", note: "Non-Quad comprehensive coverage shown; battery and drive-system mileage depends on configuration." }),
    rule("lucid-air", ["LUCID"], 2022, CURRENT_MODEL_YEAR, coverage(48, 50000), null, "lucid", { models: ["AIR", "GRAVITY"], evBattery: coverage(96, 100000) }),
    rule("vinfast-us", ["VINFAST"], 2023, CURRENT_MODEL_YEAR, coverage(120, 125000), null, "vinfast", { evBattery: coverage(120, null) }),

    rule("smart-2012-2019", ["SMART"], 2012, 2019, coverage(48, 50000), coverage(48, 50000), "mercedes"),
    rule("suzuki-2012-2013", ["SUZUKI"], 2012, 2013, coverage(36, 36000), coverage(84, 100000), "suzuki"),
    rule("maserati-2012-plus", ["MASERATI"], 2012, CURRENT_MODEL_YEAR, coverage(48, 50000), coverage(48, 50000), "maserati"),
    rule("aston-martin-2012-plus", ["ASTON MARTIN"], 2012, CURRENT_MODEL_YEAR, coverage(36, null), coverage(36, null), "astonMartin"),
    rule("bentley-2012-plus", ["BENTLEY"], 2012, CURRENT_MODEL_YEAR, coverage(36, null), coverage(36, null), "bentley"),
    rule("ferrari-2012-plus", ["FERRARI"], 2012, CURRENT_MODEL_YEAR, coverage(36, null), coverage(36, null), "ferrari"),
    rule("lamborghini-2012-plus", ["LAMBORGHINI"], 2012, CURRENT_MODEL_YEAR, coverage(36, null), coverage(36, null), "lamborghini"),
    rule("mclaren-2012-plus", ["MCLAREN"], 2012, CURRENT_MODEL_YEAR, coverage(36, null), coverage(36, null), "mclaren"),
    rule("rolls-royce-2012-plus", ["ROLLS-ROYCE", "ROLLS ROYCE"], 2012, CURRENT_MODEL_YEAR, coverage(48, null), coverage(48, null), "bmw"),
    rule("lotus-2012-plus", ["LOTUS"], 2012, CURRENT_MODEL_YEAR, coverage(36, 36000), coverage(36, 36000), "lotus"),
    rule("ineos-2024-plus", ["INEOS"], 2024, CURRENT_MODEL_YEAR, coverage(60, 60000), coverage(60, 60000), "ineos"),
    rule("karma-new-generation-2025-plus", ["KARMA"], 2025, CURRENT_MODEL_YEAR, coverage(48, null), coverage(48, null), "karma", { note: "Karma's published manufacturer warranty for its current-generation U.S. vehicles." })
  ];

  const normalize = (value) => String(value || "")
    .toUpperCase()
    .replace(/[®™]/g, "")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();

  const formatCoverage = (item) => {
    if (!item) return null;
    const years = item.months % 12 === 0 ? `${item.months / 12} years` : `${item.months} months`;
    const miles = item.miles == null ? "unlimited miles" : `${item.miles.toLocaleString()} miles`;
    return `${years} / ${miles}`;
  };

  function lookup(input) {
    const make = normalize(input && input.make);
    const model = normalize(input && input.model);
    const trim = normalize(input && input.trim);
    const year = Number(input && input.year);

    const matches = rules.filter((candidate) => {
      if (!candidate.makes.map(normalize).includes(make)) return false;
      if (!Number.isInteger(year) || year < candidate.from || year > candidate.to) return false;
      if (candidate.models && !candidate.models.map(normalize).includes(model)) return false;
      if (candidate.trimPatterns && !candidate.trimPatterns.some((pattern) => trim.includes(normalize(pattern)))) return false;
      return true;
    });

    matches.sort((a, b) => {
      const trimSpecificity = Number(Boolean(b.trimPatterns)) - Number(Boolean(a.trimPatterns));
      if (trimSpecificity) return trimSpecificity;
      const modelSpecificity = Number(Boolean(b.models)) - Number(Boolean(a.models));
      if (modelSpecificity) return modelSpecificity;
      return (a.to - a.from) - (b.to - b.from);
    });

    const selected = matches[0];
    if (!selected) {
      return {
        status: "unverified",
        basic: "Not verified",
        powertrain: "Not verified",
        note: "No audited factory-warranty record is available for this exact model-year combination."
      };
    }

    const source = sources[selected.sourceId];
    const evText = formatCoverage(selected.evBattery);
    return {
      status: "verified",
      ruleId: selected.id,
      basic: formatCoverage(selected.basic),
      powertrain: selected.powertrainText || formatCoverage(selected.powertrain) || evText || "Not applicable",
      powertrainLabel: selected.powertrain ? "Powertrain" : "EV Battery / Drive Unit",
      evBattery: evText,
      note: selected.note || "Original U.S. new-vehicle limited warranty terms.",
      source: source ? source.title : "OEM warranty documentation",
      sourceUrl: source ? source.url : null,
      verifiedOn: selected.verifiedOn
    };
  }

  window.__MRC_WARRANTY_DB__ = Object.freeze({
    version: "2026.09.17-audit-2",
    region: "United States",
    modelYearStart: 2012,
    modelYearEnd: CURRENT_MODEL_YEAR,
    sources,
    rules
  });
  window.__MRC_WARRANTY_LOOKUP__ = lookup;
})();
