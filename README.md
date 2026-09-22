# MRC One-Pager Generator

Recovered deployable build for the Vercel project named `mdmrc`.

## Factory-warranty comparison

The app displays original U.S. factory basic and powertrain/EV-system terms in
both the results view and printable/PDF one-pager. Lookup is model-year aware,
supports model/trim overrides, cites the OEM source, and returns `Not verified`
instead of estimating when an audited exact match is unavailable.

Each decoded vehicle also includes a **View Cost to Own on Edmunds** link in
the results view and printable/PDF one-pager. The URL is generated from the
decoded year, make, and model and opens that vehicle's Edmunds True Cost to
Own® page in a new tab. Edmunds is an independent third-party source, and TCO
availability and estimates may vary by year, trim, configuration, and location.

## Build

Run `npm run build`. The deployable output is written to `dist/`.

Run `node validate-warranty-db.mjs` to validate rule integrity and historical
breakpoints. See `WARRANTY_DATA.md` for the scope and accuracy policy.

The current app was originally deployed without a linked source repository.
`patch-warranty.mjs` documents the factory-warranty modification applied to
the recovered production bundle, and `patch-edmunds-link.mjs` documents the
Edmunds-link modification.
