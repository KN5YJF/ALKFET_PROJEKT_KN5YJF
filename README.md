# 1. Projekt leírás

Ez a projekt, egy egyszerű Task Manager webalkalmazás, amely teljes end-to-end DevOps folyamatot valósít meg a fejlesztéstől a deploy-ig.

A rendszer fő elemei:

					- Angular frontend
					- ASP.NET Web API backend
					- MongoDB adatbázis
					- Docker konténerizáció
					- GitHub Actions CI pipeline
					- Kubernetes + ArgoCD

---

# 2. Funkciók

Az alkalmazás az alábbi funkciókat biztosítja:

					- Feladat létrehozása
					- Feladat törlése
					- Feladat állapotának módosítása (kész / nem kész)
					- Azonnali UI frissítés

---

# 3. Architektúra

A rendszer három fő komponensből áll:

					- Frontend → HTTP kérésekkel kommunikál a backenddel  
					- Backend → üzleti logika kezelése  
					- MongoDB → adatok tárolása  

---

# 4. CI/CD pipeline

A projekt GitHub Actions alapú CI pipeline-t használ:

					- push → GitHub repository
					- build:
							- frontend (Angular build)
							- backend (.NET publish)
					- Docker image build
					- image push → GHCR

---

# 5. Kubernetes működés

A rendszer Kubernetes környezetben is futtatható:

					- Deployment → konténerek futtatása
					- Service → elérhetőség biztosítása
					- ArgoCD → automatikus deploy

---

# 6. Telepítés

## Lokális futtatás (Docker)

git clone: 		https://github.com/KN5YJF/ALKFET_PROJEKT_KN5YJF.git

	Elérés:
				Frontend: 		http://localhost:4200
				Backend API: 	http://localhost:5237/api/todo
				Swagger: 		http://localhost:5237/swagger/index.html

---

# 7. Használat (User guide)

				- Új feladat hozzáadása
				- Feladat állapotának módosítása
				- Feladat törlése

	        A felhasználói felület minimalista, célja az egyszerű és gyors használhatóság.

---

# 8. Összegzés

	Reményeim szerint a feladatmegoldássorán elértem, a kiírásban meghatározott feladatok megvalósulását és azok kivitelezési szintje kielégítő.
	Véleméynem szerint, a feladat szellemisége - célja: 
				- korszerű sandardok mentén menjen végbe a fejlesztési feladat
				- ezzel gyakorlatban oktat arra, hogy  szakmai és gyakorlatias legyen az előremenetel
				- lehetővé teszi, hogy az eredeti projekttől független fejlesztők is hatákonyan 
            rálássanak az alkalmazásra