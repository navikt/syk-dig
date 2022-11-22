# syk-dig

Frontend for visning og digitalisering av papir sykmeldinger.

## Kjør lokalt

### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token) som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens). Dersom du har en PAT som du bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

### Kjør appen

Installer avhengigheter, dette trenger du kun å gjøre når avhengigheter endrer seg:

```bash
yarn
```

Kjør appen i utviklingsmodus:

```bash
yarn start
```

Bygging av appen i utviklingsmodus:

```bash
yarn build
```

### Kontakt/spørsmål

Prosjektet er vedlikeholdt av [teamsykmelding](CODEOWNERS)

Spørsmål og/eller feature requests? Vennligst lag ein [issue](https://github.com/navikt/sykdig/issues).

Dersom du jobber i [@navikt](https://github.com/navikt) kan du nå oss på slack
kanalen [#team-sykmelding](https://nav-it.slack.com/archives/CMA3XV997).
