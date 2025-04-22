# Automated Support System

Un système de support client automatisé pour les commerces, intégrant n8n, Airtable, Telegram et une interface web Astro.

## Fonctionnalités

- 🤖 Réponses automatiques aux clients via Telegram/WhatsApp
- 📊 Tableau de bord avec statistiques en temps réel
- 🌐 Landing page personnalisable pour chaque commerce
- 📝 Enregistrement des demandes dans Airtable
- 📱 Notifications Telegram pour les commerçants

## Prérequis

- Docker et Docker Compose
- Node.js 18+
- Compte Airtable
- Bot Telegram
- npm ou yarn

## Configuration

1. **Variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Remplissez les variables suivantes dans le fichier `.env` :
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `TELEGRAM_BOT_TOKEN`
   - `DASHBOARD_ACCESS_TOKEN`

2. **Installation des dépendances frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Démarrage de n8n**
   ```bash
   docker-compose up -d
   ```
   n8n sera accessible sur http://localhost:5678

4. **Démarrage du frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Le frontend sera accessible sur http://localhost:3000

## Structure du projet

```
.
├── docker-compose.yml    # Configuration Docker pour n8n
├── frontend/            # Application Astro
│   ├── src/
│   │   ├── pages/      # Pages du site
│   │   └── components/ # Composants réutilisables
├── n8n-data/           # Données persistantes n8n
└── .env.example        # Template des variables d'environnement
```

## Configuration n8n

1. Accédez à l'interface n8n sur http://localhost:5678
2. Importez les workflows depuis le dossier `workflows/`
3. Configurez les credentials pour Airtable et Telegram
4. Activez les workflows

## Accès au tableau de bord

Le tableau de bord est accessible via l'URL :
```
http://localhost:3000/dashboard?token=VOTRE_TOKEN
```

## Personnalisation de la landing page

Modifiez le fichier `frontend/src/data/business.json` pour personnaliser :
- Nom du commerce
- Description
- Horaires d'ouverture
- Informations de contact
- Images et logo

## Support

Pour toute question ou problème, ouvrez une issue sur ce dépôt.

## Licence

MIT