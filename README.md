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
