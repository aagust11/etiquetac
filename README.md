# e-Tiquet-TAC

Gestor local-first de tiquets del servei TAC de l'Institut Mollet del Vallès. Interfície en català, sense backend ni dependències externes; dades en IndexedDB i exportació/vinculació d'un fitxer JSON.

## Funcionalitats

- Tiquets identificats com a `TAC-AAAA-NNNN`, estats, prioritats, categories i cercador.
- Subtasques, comentaris interns/públics, historial d'actuacions i enllaços.
- Dispositius afectats i equips cedits, amb registre de devolució.
- Generació de resum de tiquet en HTML i text pla per enganxar a un correu.
- Accessos ràpids, preferits, amplada configurable i controls per ordenar o eliminar.
- Tauler, exportació CSV i exportació/importació JSON.
- Desat al navegador i vinculació a fitxer en Chrome/Edge d'escriptori.

## Ús del fitxer de dades amb OneDrive

1. Obre l'aplicació en Chrome o Edge i crea el primer tiquet. Les dades es desen a IndexedDB.
2. Descarrega una còpia JSON a **Configuració** i mou-la a una carpeta sincronitzada amb OneDrive.
3. Fes clic a **Vincular fitxer JSON** i selecciona el JSON de la carpeta OneDrive.
4. Concedeix els permisos necessaris i comprova l'indicador de desat.
5. En un altre ordinador, espera que OneDrive hagi sincronitzat el fitxer i vincula la seva còpia local.

**Important:** el navegador només confirma que ha desat el fitxer *local*. No confirma la sincronització al núvol. No editis la mateixa base de dades simultàniament en diferents ordinadors. Quan s'identifica un conflicte, l'aplicació bloqueja l'escriptura automàtica: exporta el JSON abans de substituir o tornar a vincular. No hi ha fusió automàtica de versions.

## Desenvolupament i publicació

El codi principal és `index.html`: es pot obrir amb un servidor estàtic, i es publica amb GitHub Pages mitjançant `.github/workflows/pages.yml`. A **Settings → Pages → Build and deployment**, selecciona **GitHub Actions** com a font. La URL prevista, quan Pages estigui activat, és https://aagust11.github.io/etiquetac/.

## Seguretat

No guardis credencials, contrasenyes, tokens ni dades personals innecessàries als tiquets. El repositori públic només conté codi; el JSON s'ha de mantenir fora del repositori.

## Estat

Primera versió operativa. Pendent: fusió avançada de conflictes, sincronització confirmada al núvol, inventari independent, calendari i Kanban.
