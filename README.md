# Smart Greenhouse Manager

L'application simule automatiquement des données de capteurs toutes les minutes, permettant de tester le système d'alertes et de visualiser l'évolution des conditions environnementales sur le dashboard temps quasi-réel.

## Fonctionnalitésion web de suivi et gestion d'une serre connectée.

## Description

**Smart Greenhouse Manager** est une application complète de monitoring environnemental pour serres connectées qui permet de :

**Surveiller en temps réel** les conditions de votre serre grâce à des capteurs simulés qui mesurent :
- 🌡️ **Température** (15-30°C)
- 💧 **Humidité** (30-90%)  
- ☀️ **Luminosité** (200-1000 lux)

**Gérer intelligemment les alertes** :
- Définition de seuils personnalisés par utilisateur pour chaque type de mesure
- Génération automatique d'alertes lorsque les valeurs dépassent les seuils définis
- Historique complet des alertes pour suivi et analyse

**Contrôler l'accès** avec un système d'authentification robuste :
- Inscription/connexion sécurisée avec JWT
- Gestion des rôles (utilisateur/administrateur)
- Interface intuitive et responsive

**Architecture moderne** :
- Interface React moderne avec TailwindCSS
- API REST Node.js/Express performante  
- Stockage hybride : MySQL (utilisateurs/alertes) + MongoDB (mesures)
- Déploiement containerisé avec Docker

L'application simule automatiquement des données de capteurs toutes les minutes, permettant de tester le système d'alertes et de visualiser l'évolution des conditions environnementales sur le dashboard temps quasi-réel.

## Fonctionnalitésrt Greenhouse Manager

Application web de suivi et gestion d’une serre connectée.

## Fonctionnalités
- Authentification JWT (login / register, rôles user/admin)
- Dashboard temps quasi-réel des mesures (température, humidité, luminosité)
- Définition de seuils par utilisateur
- Génération automatique d’alertes lors du dépassement (stockage MySQL)
- Historique des alertes
- Simulation de capteurs (script Node toutes les minutes)

## Stack
- Backend: Node.js + Express, MySQL (Utilisateurs, Seuils, Alertes), MongoDB (Mesures)
- Frontend: React + Vite + TailwindCSS
- Sécurité: bcrypt, JWT, CORS
- Déploiement: Docker (services séparés)

## Démarrage (développement local)
```bash
cp .env.example .env
# Installer dépendances
(cd backend && npm install)
(cd frontend && npm install)
(cd simulator && npm install)
# Lancer services de base de données via docker-compose (optionnel si déjà locaux)
(cd infrastructure && docker compose up -d mysql mongo)
# Lancer backend
(cd backend && npm run dev)
# Lancer frontend
(cd frontend && npm run dev)
# Lancer simulateur
(cd simulator && npm start)
```

## Démarrage via Docker Compose (tous les services)
```bash
cp .env.example .env
(cd infrastructure && docker compose up --build)
```
Accès Frontend: http://localhost:5173
API Health: http://localhost:4000/api/health

## Documentation
- Cahier des charges: [docs/Cahier_des_charges.pdf](docs/Cahier_des_charges.pdf)

## API Principales
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Créer un utilisateur |
| POST | /api/auth/login | Connexion |
| GET | /api/users | Liste (admin) |
| POST | /api/seuils | Créer / modifier un seuil |
| GET | /api/seuils/:id | Seuils utilisateur |
| GET | /api/alertes | Historique alertes |
| GET | /api/mesures | Mesures récentes |
| POST | /api/mesures | Insérer une mesure |

## Structure MySQL
- Utilisateur(id, nom, email, mot_de_passe, role)
- Seuil(id, utilisateur_id, type, valeur_min, valeur_max)
- Alerte(id, utilisateur_id, type, valeur, date)

## Collection MongoDB
- Mesure(temperature, humidite, luminosite, date)

## Améliorations futures
- WebSocket pour temps réel
- Tests automatisés
- Frontend charts (Recharts / Chart.js)
- Gestion avancée des rôles
- Notifications (email / push)
