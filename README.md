# Mráz Hugó – klíma- és villanyszerelő weboldal

Statikus HTML/CSS/JavaScript weboldal a `https://klimaszerelo-villanyszerelo.hu/` domainre előkészítve.

## Élesítés

1. A kiszolgálón az SSL-tanúsítvány legyen aktív az oldal nyilvános megnyitásakor.
2. Minden HTTP-kérést 301-es átirányítással kell a HTTPS-változatra küldeni.
3. Feltöltés után ellenőrizni kell a kapcsolatfelvételi űrlapot és a PHP `mail()` funkciót.
4. A `sitemap.xml` címét be kell küldeni a Google Search Console-ba.

## Élesítés előtt

Az adatvédelmi tájékoztatót és az impresszumot a vállalkozás valós adataival kell kiegészíteni:

- székhely;
- nyilvántartási és adózási adatok;
- tárhelyszolgáltató adatai.

Ha elkészül a Google Cégprofil, annak valós URL-je hozzáadható a strukturált adatokhoz. A Search Console hitelesítése DNS-rekorddal vagy a Google által adott HTML-metaelemmel végezhető el.

## Helyi megnyitás

Az oldal tartalma egyszerűen megnyitható az `index.html` fájllal. Az ajánlatkérő űrlap teljes tesztjéhez PHP-képes kiszolgáló szükséges.
