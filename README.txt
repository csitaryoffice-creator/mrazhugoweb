KLÍMASZERELŐ–VILLANYSZERELŐ WEBOLDAL – TELEPÍTÉS

1. Mit kell feltölteni?
Töltse fel a DotRoll tárhely gyökérkönyvtárába az alábbiakat:
- index.html
- adatvedelmi-tajekoztato.html
- impresszum.html
- contact.php
- robots.txt
- sitemap.xml
- favicon.ico
- a teljes css, js és images mappát

Az eredeti, image1.jpeg–image26.jpeg nevű forrásfotókat és a „logó.png” forrásfájlt nem kell feltölteni. Ezek biztonsági másolatként maradnak a projekt gyökerében. A weboldal az images mappában lévő optimalizált fájlokat használja.

2. Élesítés előtt kiegészítendő adatok
Az adatvédelmi tájékoztatót és az impresszumot a vállalkozás valós székhelyével, nyilvántartási és adózási adataival, valamint a tárhelyszolgáltató adataival kell kiegészíteni.

A telefonszám 06 70 701 4527 formában szerepel. Ha ez változik, az index.html és a contact.php fájlban is ellenőrizze.

3. Search Console
A tulajdon hitelesítése DNS-rekorddal vagy a Google által adott HTML-metaelemmel végezhető el. A hitelesítés után küldje be a https://klimaszerelo-villanyszerelo.hu/sitemap.xml címet.

4. Kapcsolati űrlap
A contact.php fájlban már a klimaszereles1204@gmail.com fogadó cím szerepel; a tárhelyszolgáltatónál ellenőrizze, hogy a PHP mail() funkció használható-e a csomagban.

Ha más űrlapszolgáltatást használ, az index.html fájlban a contact-form „action” értékét cserélje a szolgáltató HTTPS-végpontjára. SMTP-jelszót soha ne írjon az index.html vagy a JavaScript fájlba.

5. Galériaképek
Az optimalizált WebP képek az images mappában vannak. Új kép hozzáadásakor WebP formátumot, 4:3 képarányt és legfeljebb körülbelül 1200 px szélességet használjon. Az index.html fájlban mindig adjon meg természetes alt szöveget, valamint width és height értéket.

6. Feltöltés után
Az SSL-tanúsítvány legyen aktív, és minden HTTP-kérés 301-es átirányítással menjen a HTTPS-változatra. Ezután nyissa meg a https://klimaszerelo-villanyszerelo.hu/ címet, és próbálja ki a mobilmenüt, a hívás gombot, a galériát és az ajánlatkérő űrlapot.

Nincs szükség npm-re, fordításra vagy terminálparancsokra. A weboldal közvetlenül feltölthető.
