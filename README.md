1. Projekt leírás
A projekt egy egyszerű Task Manager alkalmazás, amely fullstack architektúrában készült.
A cél egy teljes end-to-end DevOps megoldás megvalósítása volt, amely lefedi:
  -alkalmazás fejlesztés (frontend + backend)
  -konténerizálás Dockerrel
  -CI pipeline GitHub Actions használatával  -
  -Kubernetes alapú futtatás
  -GitOps alapú CD ArgoCD segítségével

A rendszer több komponensből áll, amelyek együtt egy automatizált, skálázható környezetben futnak.

2. Funkciók
Az alkalmazás az alábbi funkciókat biztosítja:
  -Feladatok listázása
  -Új feladat létrehozása
  -Feladat törlése
  -Feladat állapotának módosítása (kész / nem kész)
  -Lapozás a lista kezelésére

A frontend és backend valós idejű HTTP kommunikációval működik együtt.

3. Architektúra
A rendszer három fő komponensből áll:
  Frontend: Angular alapú webalkalmazás
  Backend: ASP.NET Web API
  Adatbázis: MongoDB
Kommunikáció
A frontend HTTP kérésekkel kommunikál a backend API-val
A backend MongoDB adatbázisban tárolja az adatokat
A komponensek Kubernetes Service-eken keresztül érhetők el
Egyszerűsített felépítés

Browser → Frontend → Backend → MongoDB

4. CI/CD pipeline
A projekt teljes CI/CD pipeline-t használ.
CI (Continuous Integration)
GitHub Actions végzi:
forráskód letöltése
Docker image-ek buildelése (frontend és backend)
image-ek feltöltése a GitHub Container Registry-be (GHCR)

Trigger:
minden push a main branch-re

CD (Continuous Deployment)
ArgoCD végzi:
Git repository figyelése
Kubernetes klaszter állapotának szinkronizálása
automatikus deploy
self-healing és prune funkciók

A rendszer GitOps alapú működést valósít meg.

5. Kubernetes működés
A rendszer Kubernetes klaszteren fut (Docker Desktop Kubernetes).

Fő erőforrások
Deployment (frontend, backend)
Service (frontend, backend)
MongoDB (Helm chart segítségével telepítve)
Hálózat
A frontend NodePort szolgáltatáson keresztül érhető el
A backend klaszteren belüli szolgáltatásként működik
Elérés

Frontend:
http://localhost:30080

Backend (belső elérés):
http://backend:8080

6. Telepítés
1. Kubernetes ellenőrzés
kubectl get nodes
2. MongoDB telepítés
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install mongodb bitnami/mongodb --set auth.enabled=false --set architecture=standalone
3. Alkalmazás deploy
kubectl apply -f k8s/
4. Állapot ellenőrzés
kubectl get pods
kubectl get svc
5. Frontend elérés

http://localhost:30080

7. Használat (user guide)
Alkalmazás megnyitása

Nyisd meg a böngészőben:
http://localhost:30080

Új feladat létrehozása
Írd be a feladat nevét a beviteli mezőbe
Kattints a hozzáadás gombra
Feladat állapotának módosítása
A checkbox segítségével jelöld készre / nem készre
Feladat törlése
Kattints a törlés ikonra
Navigáció
A lista lapozható (pagination)

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
ArgoCD alapú CD (GitOps)

A rendszer automatizált, skálázható és reprodukálható módon működik.
