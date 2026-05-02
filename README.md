1. Projekt leírás
Ez a projekt egy egyszerű Task Manager webalkalmazás, amely teljes end-to-end DevOps folyamatot valósít meg a fejlesztéstől a deploy-ig.

  A rendszer fő elemei:
     - Angular frontend
     - ASP.NET Web API backend
     - MongoDB adatbázis
     - Docker konténerizáció
     - GitHub Actions CI pipeline
     - Kubernetes + ArgoCD

2. Funkciók
    Az alkalmazás az alábbi funkciókat biztosítja:
     - Feladat létrehozása
     - Feladat törlése
     - Feladat kipipálása
     - Feladat állapotának módosítása (pipa törlése)

3. Architektúra
    A rendszer három fő komponensből áll:
      - Frontend HTTP kérésekkel kommunikál a backenddel
      - Backend kezeli az üzleti logikát
      - MongoDB tárolja az adatokat

        Browser → Frontend → Backend → MongoDB

4. CI/CD pipeline
    A projekt GitHub Actions alapú CI pipeline-t használ:
      - push → GitHub repository
      - build:
              -frontend (Angular build)
              -backend (.NET publish)
      - docker image build

5. Kubernetes működés
    A rendszer Kubernetes környezetben is futtatható:

    Deployment → konténerek futtatása
    Service → elérhetőség biztosítása
    ArgoCD → automatikus deploy

6. Telepítés
    Lokális futtatás - Docker
    git clone https://github.com/KN5YJF/ALKFET_PROJEKT_KN5YJF.git
    cd ALKFET_PROJEKT_KN5YJF

    docker compose up --build

    Elérés:
    Frontend: http://localhost:4200
    Backend API: http://localhost:5237/api/todo

7. Használat (user guide)
    - Új feladat hozzáadása
    - Feladat kipipálása (állapot váltás)
    - Feladat törlése

 A feladt megközelítéshez hasonlóan, a felhasználói felület minimalista.
 Ennek megfellően, használata egyszerű és magtólérthetődő.   

8. Összegzés
A projekt egy konténerizált, Kubernetes-alapú fullstack alkalmazás, amely bemutatja egy modern DevOps pipeline működését.

Megvalósított elemek:
Frontend és backend alkalmazás
MongoDB adatbázis
Docker konténerizálás
GitHub Actions CI pipeline
GHCR registry használat
Kubernetes deploy
Helm alapú adatbázis telepítés
ArgoCD alapú

Remémyeim szerint, a feladatmegoldássorán elértem, a feladatkiírásban meghatározott feladatok megvelósulását és azok kivitelezési szintjét, minőségét.