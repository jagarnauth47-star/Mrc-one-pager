# Factory warranty data

This app contains a versioned, local database of original U.S. new-vehicle
warranty terms. It does not attempt to decide whether a vehicle still has
coverage.

## Scope

- Model years 2012 through the current database model year
- U.S.-market passenger cars, SUVs, minivans, and consumer light-duty pickups
- Basic/bumper-to-bumper and powertrain coverage
- EV battery/drive-unit coverage where a conventional powertrain term does not apply
- Subsequent-owner transfer treatment and manufacturer-specific exceptions

## Accuracy rules

1. A rule identifies its make, model-year range, coverage terms, OEM source, and verification date.
2. Model- or trim-specific terms take precedence over a make-wide rule.
3. When the VIN decoder does not expose a configuration that changes warranty mileage, the result says configuration verification is required.
4. When no audited rule matches, the result says `Not verified`; the app does not estimate or silently use a current-model warranty.
5. Terms describe the original warranty and published transfer rules, not a determination of remaining coverage, eligibility, title history, exclusions, or the vehicle's in-service date.
6. Subsequent-owner notes link to an official manufacturer warranty page and never imply that coverage restarts on the used-vehicle purchase date.

## Maintenance

- Update `warranty-db.js` only from manufacturer warranty booklets or official owner/warranty pages.
- Split a rule whenever terms change by model year, model, powertrain, battery pack, or trim.
- Advance the database version and verification date with each audited update.
- Run `node validate-warranty-db.mjs` and `npm run build` before deployment.

The app uses the free NHTSA vPIC service only to decode the VIN. Warranty lookup
is performed locally, so the warranty feature has no paid API or per-request cost.
