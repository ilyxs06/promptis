import re
import shutil

filepath = 'c:\\wamp64\\www\\Stage\\documentation\\RAPPORT_DE_STAGE_BACKUP.md'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. 2.1 A propos de Promptis table
text = re.sub(
    r'\| Information \| Détail \|\n\|---\|---\|\n\| \*\*Nom\*\* \| Promptis \|\n\| \*\*Secteur\*\* \| IT Consulting Services \|\n\| \*\*Localisation\*\* \| Casablanca, Maroc \|\n\| \*\*Site web\*\* \| https://www\.promptis\.ma \|\n\| \*\*Type\*\* \| Entreprise de services numériques \|',
    r'- **Nom** : Promptis\n- **Secteur** : IT Consulting Services\n- **Localisation** : Casablanca, Maroc\n- **Site web** : https://www.promptis.ma\n- **Type** : Entreprise de services numériques',
    text
)

# 2. 2.2 Domaines d'expertise table
text = re.sub(
    r'\| Domaine \| Description \|\n\|---\|---\|\n\| \*\*Développement de logiciels\*\* \| Applications sur mesure adaptées aux besoins métier \|\n\| \*\*Data Engineering & Analytics\*\* \| Solutions de gestion et analyse de données \|\n\| \*\*Solutions Web & E-Commerce\*\* \| Sites web, plateformes e-commerce, applications web \|\n\| \*\*Infrastructure Cloud & DevOps\*\* \| Migration cloud, automatisation, CI/CD \|\n\| \*\*Design UX/UI\*\* \| Conception d\'interfaces utilisateur modernes \|',
    r'- **Développement de logiciels** : Applications sur mesure adaptées aux besoins métier\n- **Data Engineering & Analytics** : Solutions de gestion et analyse de données\n- **Solutions Web & E-Commerce** : Sites web, plateformes e-commerce, applications web\n- **Infrastructure Cloud & DevOps** : Migration cloud, automatisation, CI/CD\n- **Design UX/UI** : Conception d\'interfaces utilisateur modernes',
    text
)

# 3. 3.3 Objectifs table
text = re.sub(
    r'\| \# \| Objectif \| Description \|\n\|---\|---\|---\|\n\| 1 \| \*\*Gestion RH\*\* \| Gérer les employés, leurs compétences et affectations \|\n\| 2 \| \*\*Gestion de Projets\*\* \| Suivre les projets clients avec progression en temps réel \|\n\| 3 \| \*\*Portail Client\*\* \| Permettre aux clients de suivre leurs projets et créer des tickets \|\n\| 4 \| \*\*Système de Tickets\*\* \| Centraliser et gérer les demandes de support \|\n\| 5 \| \*\*Gestion Documentaire\*\* \| Partager des fichiers de manière sécurisée \|\n\| 6 \| \*\*Notifications\*\* \| Alerter les utilisateurs des événements importants \|',
    r'- **1. Gestion RH** : Gérer les employés, leurs compétences et affectations\n- **2. Gestion de Projets** : Suivre les projets clients avec progression en temps réel\n- **3. Portail Client** : Permettre aux clients de suivre leurs projets et créer des tickets\n- **4. Système de Tickets** : Centraliser et gérer les demandes de support\n- **5. Gestion Documentaire** : Partager des fichiers de manière sécurisée\n- **6. Notifications** : Alerter les utilisateurs des événements importants',
    text
)

# 4. 4.1.1 Acteurs table
text = re.sub(
    r'\| Acteur \| Rôle \| Permissions \|\n\|---\|---\|---\|\n\| \*\*Administrateur\*\* \| Gestionnaire Promptis \| Accès complet : CRUD employés, clients, projets, tickets, fichiers \|\n\| \*\*Employé\*\* \| Membre de l\'équipe \| Consultation projets assignés, gestion tickets assignés, fichiers \|\n\| \*\*Client\*\* \| Client externe \| Consultation ses projets, création tickets, téléchargement fichiers \|',
    r'- **Administrateur** (Gestionnaire Promptis) : Accès complet (CRUD employés, clients, projets, tickets, fichiers)\n- **Employé** (Membre de l\'équipe) : Consultation projets assignés, gestion tickets assignés, fichiers\n- **Client** (Client externe) : Consultation de ses projets, création tickets, téléchargement fichiers',
    text
)

# 5. 4.2 Diagramme Cas utilisation (ASCII)
ascii_cas = re.search(r'┌───(.*?)PROMPTIS MANAGER(.*?)┘', text, re.DOTALL)
if ascii_cas:
    text = text.replace(ascii_cas.group(0), 
"> *Veuillez remplacer l'image ci-dessous par la capture d'écran de votre propre Diagramme de Cas d'Utilisation UML.*\n\n![Diagramme de Cas d'Utilisation UML](./chemin/vers/diagramme_cas_utilisation.png)\n")

# 6. 4.3 Diagramme Classes (ASCII)
ascii_classes = re.search(r'┌───(.*?)Comment(.*?)┘', text, re.DOTALL)
if ascii_classes:
    text = text.replace(ascii_classes.group(0), 
"> *Veuillez remplacer l'image ci-dessous par la capture d'écran de votre propre Diagramme de Classes UML.*\n\n![Diagramme de Classes UML](./chemin/vers/diagramme_classes.png)\n")

# 7. 4.4 Modèle Base données
text = re.sub(
    r'La base de données \*\*promptis_manager\*\* comprend les tables suivantes :.*?\*\*Priorités des tickets :\*\* `basse`, `moyenne`, `haute`, `urgente`',
    r"""> *Veuillez insérer ici votre Modèle Conceptuel de Données (MCD) ou Modèle Logique de Données (MLD).*\n\n![Modèle de Base de Données (MCD / MLD)](./chemin/vers/modele_bdd.png)\n\n**Statuts des projets :** `planifie`, `en_cours`, `en_pause`, `termine`, `annule`\n**Statuts des tickets :** `ouvert`, `en_cours`, `resolu`, `ferme`\n**Priorités des tickets :** `basse`, `moyenne`, `haute`, `urgente`""",
    text, flags=re.DOTALL
)

# 8. 5.1 Stack technique - Frontend
text = re.sub(
    r'\| Technologie \| Version \| Usage \|\n\|---\|---\|---\|\n\| \*\*React\.js\*\* \| 18\+ \| Framework JavaScript pour interfaces utilisateur \|\n\| \*\*Vite\*\* \| 7\.3\.1 \| Build tool et serveur de développement \|\n\| \*\*Tailwind CSS\*\* \| 4\.1 \| Framework CSS utilitaire \|\n\| \*\*React Router\*\* \| 6\+ \| Gestion du routage SPA \|\n\| \*\*Axios\*\* \| - \| Client HTTP pour les appels API \|\n\| \*\*Heroicons\*\* \| - \| Bibliothèque d\'icônes \|\n\| \*\*Recharts\*\* \| - \| Graphiques et visualisations \|\n\| \*\*React Hot Toast\*\* \| - \| Notifications toast \|',
    r'- **React.js** (v18+) : Framework JavaScript pour interfaces utilisateur\n- **Vite** (v7.3.1) : Build tool et serveur de développement\n- **Tailwind CSS** (v4.1) : Framework CSS utilitaire\n- **React Router** (v6+) : Gestion du routage SPA\n- **Axios** : Client HTTP pour les appels API\n- **Heroicons** : Bibliothèque d\'icônes\n- **Recharts** : Graphiques et visualisations\n- **React Hot Toast** : Notifications toast',
    text
)

# 9. 5.1 Stack technique - Backend
text = re.sub(
    r'\| Technologie \| Version \| Usage \|\n\|---\|---\|---\|\n\| \*\*Laravel\*\* \| 11 \| Framework PHP \|\n\| \*\*PHP\*\* \| 8\.2\+ \| Langage backend \|\n\| \*\*Laravel Sanctum\*\* \| - \| Authentification API par tokens \|\n\| \*\*Eloquent ORM\*\* \| - \| Mapping objet-relationnel \|\n\| \*\*MySQL\*\* \| 8\.0\+ \| Base de données relationnelle \|',
    r'- **Laravel** (v11) : Framework PHP pour le backend\n- **PHP** (v8.2+) : Langage backend\n- **Laravel Sanctum** : Authentification API par tokens\n- **Eloquent ORM** : Mapping objet-relationnel\n- **MySQL** (v8.0+) : Base de données relationnelle',
    text
)

# 10. 5.2 Outils de dev
text = re.sub(
    r'\| Outil \| Usage \|\n\|---\|---\|\n\| \*\*VS Code\*\* \| Éditeur de code principal \|\n\| \*\*WAMP Server\*\* \| Environnement local \(Apache, MySQL, PHP\) \|\n\| \*\*Git\*\* \| Gestion de versions \|\n\| \*\*Postman\*\* \| Tests des endpoints API \|\n\| \*\*Chrome DevTools\*\* \| Débogage frontend \|\n\| \*\*MySQL Workbench\*\* \| Administration base de données \|',
    r'- **VS Code** : Éditeur de code principal\n- **WAMP Server** : Environnement local (Apache, MySQL, PHP)\n- **Git** : Gestion de versions\n- **Postman** : Tests des endpoints API\n- **Chrome DevTools** : Débogage frontend\n- **MySQL Workbench** : Administration base de données',
    text
)

# 11. 6.3 Captures decran
captures_remplacement = r"""> *Dans cette section, remplacez les images par vos propres captures d'écran de l'application et décrivez brièvement chaque page.*

### 1. Page d'accueil (Landing Page)
*Description : Présentation de Promptis Manager (page publique).*
![Capture de la Page d'accueil](./chemin/vers/image_accueil.png)

### 2. Page de connexion
*Description : Vue du formulaire de login.*
![Capture de Connexion](./chemin/vers/image_login.png)

### 3. Dashboard Administrateur
*Description : Vue d'ensemble avec statistiques et indicateurs globaux.*
![Capture du Dashboard Admin](./chemin/vers/image_dashboard.png)

### 4. Gestion des employés / clients
*Description : Interface de gestion, liste ou création de comptes.*
![Capture Liste employés](./chemin/vers/image_employes.png)

### 5. Détails d'un Projet & Progression
*Description : Suivi d'un projet, barre de progression et équipe.*
![Capture Projet](./chemin/vers/image_projet.png)"""

text = re.sub(r'> \*\*Note :\*\* Insérer ici les captures d\'écran de l\'application :.*?\*\(Les captures d\'écran doivent être prises de l\'application en fonctionnement et insérées dans le document final\)\*', captures_remplacement, text, flags=re.DOTALL)

# Save edited backup
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Text formatting fixed.")
