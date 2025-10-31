# 🚀 Projet de Gestion de Reçus et Factures

## 📋 Description du Projet
Application web moderne permettant la création et gestion de reçus et factures avec une interface intuitive, développée avec Vue.js (frontend), Django (backend API) et Rust (services backend avancés).

## 🛠 Architecture Technique

### Frontend (Vue.js 3)
```
frontend/
├── src/
│   ├── components/
│   │   ├── invoices/
│   │   ├── receipts/
│   │   └── common/
│   ├── views/
│   ├── stores/ (Pinia)
│   ├── composables/
│   └── utils/
├── public/
└── package.json
```

### Backend (Django)
```
backend/
├── invoices/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── receipts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── core/
└── manage.py
```

### Services Rust
```
rust-services/
├── pdf-generator/
├── calculations/
└── api/
```

## 🎯 Fonctionnalités Principales

### 1. Gestion des Factures
- ✅ Création de factures professionnelles
- 📊 Ajout d'articles avec taxes
- 💰 Calculs automatiques (sous-total, TVA, total)
- 🏢 Informations client/fournisseur
- 📤 Export PDF

### 2. Gestion des Reçus
- 🧾 Création de reçus simples
- 🏷️ Codes QR intégrés
- 📱 Interface mobile-friendly
- 🔢 Numérotation automatique

### 3. Fonctionnalités Avancées
- 📈 Tableau de bord analytique
- 🔍 Recherche et filtres
- ☁️ Sauvegarde cloud
- 👥 Gestion multi-utilisateurs

## 🚀 Démarrage Rapide

### Prérequis
```bash
# Frontend
node.js 18+
npm ou yarn

# Backend
python 3.9+
pip

# Rust
rustc 1.70+
cargo
```

### Installation Frontend (Vue.js)
```bash
cd frontend
npm install

# Développement
npm run dev

# Production
npm run build
```

### Installation Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Services Rust
```bash
cd rust-services
cargo build
cargo run
```

## 🎨 Design System

### Couleurs
```css
:root {
  --primary: #2563eb;
  --secondary: #64748b;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Composants UI
- Boutons avec variants
- Cartes modulaires
- Formulaires réactifs
- Modales contextuelles
- Tableaux paginés

## 📊 Modèles de Données

### Facture (Django Model)
```python
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50)
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    issue_date = models.DateField()
    due_date = models.DateField()
    items = models.JSONField()  # Liste d'articles
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
```

## 🔧 API Endpoints

### Factures
```
GET    /api/invoices/          # Liste des factures
POST   /api/invoices/          # Créer une facture
GET    /api/invoices/{id}/     # Détails facture
PUT    /api/invoices/{id}/     # Modifier facture
DELETE /api/invoices/{id}/     # Supprimer facture
POST   /api/invoices/{id}/pdf/ # Générer PDF
```

### Reçus
```
GET    /api/receipts/
POST   /api/receipts/
GET    /api/receipts/{id}/
```

## 🎯 Prochaines Étapes

### Phase 1 (Semaine 1)
- [ ] Setup des projets Vue.js, Django, Rust
- [ ] Modèles de base de données
- [ ] Interface création facture simple
- [ ] Composants UI de base

### Phase 2 (Semaine 2)
- [ ] Système d'authentification
- [ ] Génération PDF avec Rust
- [ ] Calculs automatiques
- [ ] Interface responsive

### Phase 3 (Semaine 3)
- [ ] Tableau de bord
- [ ] Recherche et filtres
- [ ] Export de données
- [ ] Optimisations performances

## 💡 Idées d'Améliorations Futures

- 📱 Application mobile (Flutter/React Native)
- 🤖 IA pour suggestions d'articles
- 🔄 Synchronisation en temps réel
- 🌐 Multi-langues
- 💳 Intégration paiements en ligne

## 🐛 Dépannage Commun

### Problèmes CORS
```python
# Dans settings.py Django
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Erreurs de Build Rust
```bash
# Nettoyer et rebuild
cargo clean
cargo build
```

## 📚 Ressources Utiles

- [Vue.js Documentation](https://vuejs.org/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**✨ Bon code ! Que cette aventure soit remplie de composants réactifs, d'APIs robustes et de services Rust performants !**