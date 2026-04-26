# Task Manager dokumentáció

## 1. Projekt leírás

A projekt egy **Task Manager** alkalmazás, amely fullstack architektúrában készült.
A cél egy teljes end-to-end DevOps megoldás megvalósítása volt, amely lefedi:

- Alkalmazásfejlesztés (frontend + backend)
- Konténerizálás Dockerrel
- CI pipeline GitHub Actions használatával
- Kubernetes alapú futtatás
- GitOps alapú CD ArgoCD segítségével

---

## 2. Funkciók

Az alkalmazás az alábbi funkciókat biztosítja:

| Funkció | Leírás |
|---|---|
| Feladatok listázása | Az összes feladat megjelenik a főoldalon |
| Új feladat létrehozása | Cím megadásával új feladat adható hozzá |
| Feladat törlése | Egy kattintással törölhető bármely feladat |
| Állapot módosítása | Checkbox segítségével jelölhető kész / nem kész |
| Lapozás | A lista 5 elemenként lapozható |
| Hibajelzés | Toast értesítés jelenik meg hiba esetén |

---

## 3. Architektúra

```
Browser → Frontend (Angular) → Backend (ASP.NET) → MongoDB
```

| Komponens | Technológia | Port |
|---|---|---|
| Frontend | Angular 19 + Nginx | 30080 (NodePort) |
| Backend | ASP.NET Core 10 | 8080 (ClusterIP) |
| Adatbázis | MongoDB 8 (Helm) | 27017 (ClusterIP) |

---

## 4. CI/CD pipeline

### CI — Continuous Integration (GitHub Actions)

Minden `main` branch-re történő push esetén automatikusan lefut:

1. Forráskód letöltése
2. Docker image buildelése (frontend + backend)
3. Image-ek feltöltése GitHub Container Registry-be (ghcr.io)

**Image-ek:**
- `ghcr.io/kn5yjf/alkfet_projekt_kn5yjf/backend:latest`
- `ghcr.io/kn5yjf/alkfet_projekt_kn5yjf/frontend:latest`

### Continuous Deployment (ArgoCD)

Az ArgoCD figyeli a GitHub repository `k8s/` mappáját, és automatikusan szinkronizálja a Kubernetes klasztert:

- **Self-heal:** ha valaki manuálisan módosít valamit a klaszteren, ArgoCD visszaállítja
- **Prune:** törölt manifest fájlok alapján eltávolítja a felesleges erőforrásokat
- **Automatikus sync:** push után néhány percen belül érvénybe lép

---

## 5. Előfeltételek

A következő eszközök szükségesek a rendszer futtatásához:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Git](https://git-scm.com/)

---

## 6. Telepítési útmutató

### 6.1 Kubernetes ellenőrzése

Engedélyezd a Kubernetes-t a Docker Desktopban:
**Settings → Kubernetes → Enable Kubernetes → Apply & Restart**

Ellenőrzés:
```bash
kubectl get nodes
```
Várt kimenet:
```
NAME             STATUS   ROLES           AGE   VERSION
docker-desktop   Ready    control-plane   Xd    v1.xx.x
```

### 6.2 ArgoCD telepítése

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Várd meg, amíg minden pod elindul:
```bash
kubectl get pods -n argocd -w
```
Akkor kész, ha minden pod `1/1 Running` állapotban van.

### 6.3 ArgoCD UI elérése

Nyiss egy terminált és futtasd:
```bash
kubectl port-forward svc/argocd-server -n argocd 9090:443
```

Admin jelszó lekérése:

**PowerShell:**
```powershell
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | %{ [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

Nyisd meg böngészőben: **https://localhost:9090**
- Felhasználónév: `admin`
- Jelszó: a fenti parancs kimenete

> Az SSL figyelmeztetésnél kattints: Haladó → Továbblépés

### 6.4 MongoDB telepítése Helm charttal

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install mongodb bitnami/mongodb -f k8s/mongodb-values.yaml -n default
```

Ellenőrzés:
```bash
kubectl get pods -n default
```
Várd meg, amíg a `mongodb-xxx` pod `1/1 Running` állapotú lesz.

### 6.5 Alkalmazás deployolása ArgoCD-vel

```bash
kubectl apply -f k8s/argocd-app.yaml -n argocd
```

Az ArgoCD ezután automatikusan telepíti a frontend és backend komponenseket a `k8s/` mappa alapján.

Manuális ellenőrzés:
```bash
kubectl get pods -n default
kubectl get services -n default
```

Várt kimenet:
```
NAME                    READY   STATUS    RESTARTS
mongodb-xxx             1/1     Running   0
todo-backend-xxx        1/1     Running   0
todo-frontend-xxx       1/1     Running   0
```

### 6.6 Alkalmazás elérése

| Komponens | URL | Megjegyzés |
|---|---|---|
| Frontend | http://localhost:30080 | Böngészőből elérhető |
| ArgoCD UI | https://localhost:9090 | Port-forward szükséges |
| Backend Swagger | http://localhost:5237/swagger | Csak helyi fejlesztésnél érhető el |

---

## 7. Használati útmutató

### Az alkalmazás megnyitása

Nyisd meg böngészőben:
```
http://localhost:30080
```

### Feladatok megtekintése

A főoldalon (`/tasks`) megjelenik az összes feladat listája. Ha még nincs egy sem, a „Nincsenek feladatok." üzenet látható.

### Új feladat hozzáadása

1. Kattints az **„Új feladat"** gombra a navigációs sávban
2. Írd be a feladat címét a szövegmezőbe
3. Nyomj **Enter**-t, vagy kattints a **„Mentés"** gombra
4. Az alkalmazás automatikusan visszairányít a feladatlistára
5. Sikeres mentés esetén zöld toast értesítés jelenik meg

### Feladat készre jelölése

- A feladat bal oldalán lévő **checkbox**-ra kattintva jelölheted készre
- Kész állapotban a feladat szövege áthúzva jelenik meg
- Újra kattintva visszaállítható „nem kész" állapotba

### Feladat törlése

- A feladat jobb oldalán lévő piros **„Törlés"** gombra kattintva törölhető
- A törlés azonnal érvénybe lép

### Lapozás

- Ha 5-nél több feladat van, lapozó gombok jelennek meg a lista alatt
- Az **„Előző"** és **„Következő"** gombokkal lehet lapozni
- Az aktuális oldal és az összes oldal száma megjelenik középen (pl. `1 / 3`)

### Hibajelzés

- Ha valamilyen hálózati hiba történik (pl. a backend nem elérhető), piros toast értesítés jelenik meg a jobb alsó sarokban
- Az üres cím megadása esetén szintén hibaüzenet jelenik meg
- A toast 3,5 másodperc után automatikusan eltűnik, vagy a **✕** gombbal zárható be

---

## 8. Könyvtárszerkezet

```
ALKFET_PROJEKT_KN5YJF/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── backend/
│   └── MyApi/
│       ├── Controllers/        # REST API végpontok
│       ├── Models/             # TaskItem adatmodell
│       ├── Services/           # MongoDB logika
│       ├── Program.cs          # App konfiguráció
│       ├── Dockerfile
│       ├── .gitignore          # bin/ és obj/ kizárva
│       └── MyApi.http          # CRUD request minták
├── frontend/
│   └── src/
│       └── app/
│           ├── navbar/         # Navbar komponens
│           ├── pages/          # task-list, task-add komponensek
│           ├── toast/          # Toast hibajelzés service + komponens
│           ├── task.service.ts
│           └── task.model.ts
├── k8s/
│   ├── argocd-app.yaml         # ArgoCD Application manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── mongodb-values.yaml     # Bitnami Helm chart értékek
├── docker-compose.yaml         # Helyi fejlesztői futtatás
├── README.md                   # Angol dokumentáció
└── README_HUN.md               # Magyar dokumentáció
```

---

## 9. Helyi fejlesztői futtatás, Docker Compose

Kubernetes nélkül, egyszerűen:

```bash
docker compose up --build
```

Elérés:
- Frontend: http://localhost:4200
- Backend: http://localhost:5237
- Swagger: http://localhost:5237/swagger

---