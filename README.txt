KLÍMASZERELŐ–VILLANYSZERELŐ WEBOLDAL – TELEPÍTÉS

1. Mit kell feltölteni?
Töltse fel a DotRoll tárhely gyökérkönyvtárába az alábbiakat:
- index.html
- adatvedelmi-tajekoztato.html
- impresszum.html
- robots.txt
- sitemap.xml
- favicon.ico
- a teljes css, js és images mappát

Az eredeti, image1.jpeg–image26.jpeg nevű forrásfotókat és a „logó.png” forrásfájlt nem kell feltölteni. Ezek biztonsági másolatként maradnak a projekt gyökerében. A weboldal az images mappában lévő optimalizált fájlokat használja.

2. Élesítés előtt kiegészítendő adatok
Az adatvédelmi tájékoztatót és az impresszumot a vállalkozás valós székhelyével, nyilvántartási és adózási adataival, valamint a tárhelyszolgáltató adataival kell kiegészíteni.

A telefonszám 06 70 701 4527 formában szerepel. Ha ez változik, az index.html fájlban is ellenőrizze.

3. Search Console
A tulajdon hitelesítése DNS-rekorddal vagy a Google által adott HTML-metaelemmel végezhető el. A hitelesítés után küldje be a https://klimaszerelo-villanyszerelo.hu/sitemap.xml címet.

4. Kapcsolati űrlap
A DotRoll ingyenes tárhelye statikus, PHP nem fut rajta. Az űrlap ezért a látogató levelezőprogramjában nyit meg egy kitöltött e-mailt a klimaszereles1204@gmail.com címre. A látogatónak az e-mailt a levelezőprogramban kell elküldenie.

Automatikus háttérben történő küldéshez külső űrlapszolgáltató vagy PHP-képes fizetős tárhely szükséges.

5. Galériaképek
Az optimalizált WebP képek az images mappában vannak. Új kép hozzáadásakor WebP formátumot, 4:3 képarányt és legfeljebb körülbelül 1200 px szélességet használjon. Az index.html fájlban mindig adjon meg természetes alt szöveget, valamint width és height értéket.

6. Feltöltés után
A DotRoll ügyfélkapujában aktiválja az ingyenes tárhelyet. FTP-kapcsolat: free.dotroll.com, 21-es port, passzív mód; a felhasználónév a domain neve. A DNS-ben a Parkoltatás rekordokat Freeweb rekordokra kell cserélni; a frissülés jellemzően 1–4 óra.

A HTTPS-változat aktiválása után nyissa meg a https://klimaszerelo-villanyszerelo.hu/ címet, és próbálja ki a mobilmenüt, a hívás gombot, a galériát és az ajánlatkérő űrlapot.

Nincs szükség npm-re, fordításra, Vercelre vagy terminálparancsokra. A weboldal közvetlenül feltölthető.
