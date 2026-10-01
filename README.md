# Mráz Hugó – klíma- és villanyszerelő weboldal

Statikus HTML/CSS/JavaScript weboldal Vercelhez előkészített ajánlatkérő végponttal.

## Vercel telepítés

1. Importáld a `csitaryoffice-creator/mrazhugoweb` GitHub-repót a Vercelbe.
2. Framework Preset: **Other**.
3. Build Command és Output Directory nem szükséges.
4. Állítsd be a következő környezeti változókat Production, Preview és Development környezetben:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
5. A `RESEND_FROM_EMAIL` feladó domainjét előbb hitelesíteni kell a Resendben.

Az ajánlatkérő űrlapot az `api/contact.js` Vercel Function kezeli.

## Élesítés előtt

Az oldal forrásában még cserélni kell a következő helyőrzőket a valós adatokra:

- `[VÁLLALKOZÁS NEVE]`
- `[CÍM]`
- `[GOOGLE BUSINESS PROFILE URL]`
- `[SEARCH CONSOLE TOKEN]`

## Helyi megnyitás

Az oldal tartalma egyszerűen megnyitható az `index.html` fájllal. Az ajánlatkérő végpont helyi teszteléséhez Vercel CLI vagy egy Vercel Preview Deployment szükséges.
