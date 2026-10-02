# Mráz Hugó – klíma- és villanyszerelő weboldal

Build nélküli, statikus HTML/CSS/JavaScript weboldal a DotRoll 50 MB-os ingyenes tárhelyéhez és a `https://klimaszerelo-villanyszerelo.hu/` domainhez előkészítve.

## Feltöltés a DotRoll ingyenes tárhelyére

1. A DotRoll ügyfélkapujában aktiválja az ingyenes tárhelyet és állítsa be az FTP-jelszót.
2. FTP-kapcsolat: `free.dotroll.com`, 21-es port, passzív mód; a felhasználónév a domain neve.
3. Töltse fel a ZIP tartalmát a tárhely gyökérkönyvtárába.
4. A DNS-ben a parkoltatási rekordokat a DotRoll útmutatója szerint Freeweb rekordokra kell cserélni. A frissülés jellemzően 1–4 óra.
5. A HTTPS-változat működése után ellenőrizze a domaint, majd küldje be a `sitemap.xml` címét a Google Search Console-ba.

## Élesítés előtt

Az adatvédelmi tájékoztatót és az impresszumot a vállalkozás valós adataival kell kiegészíteni:

- székhely;
- nyilvántartási és adózási adatok;
- tárhelyszolgáltató adatai.

Ha elkészül a Google Cégprofil, annak valós URL-je hozzáadható a strukturált adatokhoz. A Search Console hitelesítése DNS-rekorddal vagy a Google által adott HTML-metaelemmel végezhető el.

## Kapcsolati űrlap

A kapcsolatfelvételi űrlap JavaScript `fetch()` kéréssel közvetlenül a Web3Forms HTTPS-végpontjára küldi az adatokat. Az oldal nem töltődik újra, az eredmény helyben jelenik meg. PHP-ra vagy saját levelező kiszolgálóra nincs szükség.

## Helyi megnyitás

Az oldal közvetlenül megnyitható az `index.html` fájllal. Nincs buildfolyamat, npm, Vercel vagy szerveroldali futtatás.
