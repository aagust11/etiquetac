# e-Tiquet-TAC

Gestor local d’incidències i tasques TAC de l’Institut Mollet del Vallès, reconstruït amb React, TypeScript, Vite, Tailwind CSS i Lucide. Sense servidor de dades ni autenticació.

## Utilització

1. Obre https://aagust11.github.io/etiquetac/ amb Chrome o Edge d’escriptori.
2. Crea tiquets; els canvis es desen automàticament a IndexedDB.
3. A **Configuració**, crea un fitxer amb les dades actuals dins la carpeta local de OneDrive, o vincula un JSON existent.
4. Prem **Desar al fitxer** després de treballar. A l’altre ordinador, espera la sincronització de OneDrive i vincula el mateix fitxer.
5. Descarrega còpies de seguretat periòdicament. Esborrar les dades del navegador elimina la còpia local, però no el JSON exportat.

Els permisos del fitxer es poden haver de renovar. Firefox, Safari i mòbils poden utilitzar importació/exportació. El desat al navegador és automàtic; el desat al JSON vinculat és explícit. L’indicador no confirma mai que OneDrive hagi sincronitzat el núvol.

## Funcionalitats implementades

- Panell amb indicadors reals, tiquets bloquejats, crítics, vençuts i inactius.
- Tiquets amb UUID interns i codis correlatius TAC per any, dades de contacte, categories, prioritats, dates, etiquetes, solució i arxiu reversible.
- Cerca en tiquets, comentaris i dispositius; filtres combinats; llista, Kanban amb arrossegament i selector accessible, i agenda per data límit.
- Subtasques editables, reordenables i eliminables, amb progrés, responsables i dates.
- Comentaris interns o comunicables, historial de canvis amb valors anteriors i posteriors, reobertura i duplicació.
- Inventari lleuger, vinculació d’equips afectats, lliuraments, retorns i impediment de doble préstec actiu.
- Enllaços amb validació de protocols; accessos ràpids editables, duplicables, reordenables, amplis i preferits.
- Informe breu/complet/personalitzat amb vista prèvia, còpia HTML i text pla, notes internes excloses inicialment.
- Configuració de categories, responsables, ubicacions, signatura, introducció d’informes, nous estats i condicions internes.
- IndexedDB, còpia anterior recuperable, JSON versionat validat, fitxer persistent quan el navegador ho permet.
- Detecció externa cada 10 segons i en recuperar el focus; comprovació íntegra del fitxer abans d’escriure; bloqueig de pestanyes locals amb Web Locks.
- Revisió de conflictes: descàrrega de totes dues versions, càrrega externa, conservació local i fusió compatible entre registres diferents.

## Límits i següents iteracions

La primera versió **no implementa encara tota l’especificació**. Les descripcions i comentaris són text amb salts de línia; l’editor enriquit és pendent. També queden pendents filtres desats, columnes/densitat configurables, calendari mensual, recurrències, exportació CSV, correcció de comentaris, relacions entre tiquets, lliuraments definitius i eines de resolució camp a camp.

La fusió és conservadora a nivell de registre: canvis incompatibles en un mateix tiquet requereixen revisió manual de les còpies. Les col·lisions de codis TAC també bloquegen la fusió; no es renumeren silenciosament. La sincronització OneDrive no és transaccional: encara que es comprovi el fitxer abans d’escriure, no es pot garantir exclusió simultània entre ordinadors. Utilitza un únic ordinador editor alhora. No es promet sincronització en temps real.

El JSON nou té esquema 1 propi d’aquesta reconstrucció. Els fitxers de prototips anteriors no s’importen sense una migració explícita. No guardis contrasenyes ni tokens en tiquets.

## Desenvolupament

```sh
npm ci
npm run dev
npm test
npm run build
```

GitHub Actions executa tests i compilació i publica `dist/` a Pages en pujar a `main`. La configuració de Pages ha d’utilitzar GitHub Actions.

Tests de model: numeració, validació d’esquema i referències, fusió de registres, conflictes i col·lisions, escapament HTML i exclusió de notes internes. Cal validar al navegador real la vinculació, permisos, retorn després de tancar, sincronització OneDrive i enganxat enriquit a Outlook.

## Catàleg de dispositius i plantilles ràpides

A Configuració pots descarregar `dispositius.xlsx` buit i importar-lo amb columna A **Serial Number** i columna B **SACE**. Usa cel·les de text per mantenir zeros inicials. El primer full es llegeix localment; les correspondències s’afegeixen al JSON i no necessites tornar a importar l’Excel a cada ordinador. Per oferir el catàleg des de la web, posa’l a `public/dispositius.xlsx` abans de compilar i utilitza «Llegir dispositius.xlsx de la web». En aquest cas el catàleg serà públic; la importació local conserva les dades al teu dispositiu.

Al tiquet, «Escanejar / registrar dispositiu» accepta el lector de codis de barres amb confirmació Enter. Cerca el codi complet en SACE i SN, sense distingir majúscules; si no el troba, cerca `S` + els vuit primers caràcters del codi en SN. Si no hi ha coincidència, indica que cal introduir el SACE manualment. En desar, la correspondència SN–SACE queda al JSON i el dispositiu es vincula al tiquet. Un SACE ja registrat reutilitza el dispositiu existent. El botó de còpia al costat del SACE copia només el codi.

Les plantilles ràpides es creen, editen, dupliquen i eliminen a Configuració. Inclouen títol, descripció, tipus, categoria, prioritat i subtasques. Els tiquets creats són independents de la plantilla. S’han retirat els camps de responsable de la interfície i dels informes; els camps antics es conserven al JSON per compatibilitat.
