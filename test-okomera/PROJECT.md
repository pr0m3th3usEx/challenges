Voici le document révisé sans la partie 5 :

---

# Documentation du Projet de Visualisation des Organoïdes

## 1. Analyse des Spécifications

### Objectifs Principaux
L'application vise à fournir aux chercheurs biomédicaux un outil de visualisation et d'analyse des organoïdes pour :
- **Afficher et superposer des images de segmentation** : visualiser les organoïdes avec une superposition des masques de segmentation pour distinguer chaque organoïde du fond.
- **Calcul et affichage des métriques** : mesures basiques telles que la surface des masques de segmentation et les niveaux de contraste/luminosité pour faciliter l'analyse.

### Fonctionnalités Essentielles
1. **Superposition d'images** : charger et afficher les images des organoïdes avec les masques de segmentation. Permet une analyse visuelle rapide en superposant les masques.
2. **Affichage des métriques d'analyse** :
   - **Surface des masques** : calcul ou simulation de la surface des zones segmentées pour suivre l'évolution de la taille des organoïdes.
   - **Contraste et luminosité** : ajustement visuel pour améliorer la différenciation des structures internes.
3. **Connexion aux services Google Cloud** : stockage des images sur Google Cloud Storage pour un accès flexible et performant aux données.

## 2. Conception

### A. Interface Utilisateur (UI)
L’interface utilisateur doit être simple et intuitive, optimisée pour :
- **Visualisation d'images** : chargement rapide des images avec des contrôles pour afficher ou masquer les masques de segmentation.
- **Affichage des métriques** : intégration d’un panneau de contrôle pour visualiser les résultats d’analyse.
- **Interactions dynamiques** : des composants React dynamiques permettent aux utilisateurs de naviguer aisément entre les images et d’analyser les données.

### B. Architecture Logicielle
L'architecture suit une approche modulaire pour une meilleure organisation et maintenabilité du code :

1. **Frontend (React)** : responsable de la logique de l'interface utilisateur et de l'interaction avec l'utilisateur.
   - Composants clés :
     - **Image Viewer** : affiche les images et les masques.
     - **Metrics Panel** : affiche les métriques d’analyse.

2. **Backend (Node.js)** : gère les requêtes API, l'accès aux données et la logique de traitement des données.

   - **Endpoints API** :
     - **`/organoids?dataset=validation|test|training`** : renvoie la liste des organoïdes disponibles pour le dataset sélectionné (validation, test, ou training).
       - **Réponse** :
         ```json
         {
             "items": [
                 {
                     "id": "..."
                 }
             ],
             "count": 1
         }
         ```
     - **`/organoids/:id`** : fournit les détails d'un organoïde spécifique en fonction de l'`id` fourni.
       - **Réponse** :
         ```json
         {
             "id": "...",
             "originalImgUri": "...",
             "segmentationMaskUri": "...",
             "mask_surface": 0.0,
             "contrast": 0,
             "brightness": 0
         }
         ```

3. **Stockage des données (MongoDB)** : stocke les métadonnées des organoïdes, permettant un accès rapide aux informations pertinentes sans recharger toutes les images.

## 3. Décisions Techniques

### Choix des Technologies
- **React** pour le frontend : framework moderne et performant pour le développement d’interfaces utilisateurs dynamiques et interactives.
- **Node.js** pour le backend : environnement serveur performant et compatible avec les applications en temps réel.
- **MongoDB** pour le stockage : base de données NoSQL adaptée aux données semi-structurées et aux cas d’usage nécessitant une grande flexibilité de schéma ainsi qu'un traitement rapide.

### Utilisation de Google Cloud Storage
Les images sont stockées sur Google Cloud Storage, ce qui permet une gestion efficace des fichiers volumineux et un accès rapide pour l’analyse d’images. Ce choix facilite aussi le déploiement et l’évolutivité de l’application.

## 4. Développement du Code

### A. Points de Terminaison API

1. **Liste des organoïdes** : Le point de terminaison `GET /organoids?dataset=validation|test|training` renvoie la liste des organoïdes disponibles pour un dataset donné. Le paramètre `dataset` accepte les valeurs `validation`, `test`, ou `training`, permettant de filtrer les données par type de dataset. Ce point de terminaison facilite la navigation entre les différents groupes de données, permettant aux utilisateurs de sélectionner un organoïde spécifique pour la visualisation ou l’analyse.

2. **Détails d'un organoïde** : Le point de terminaison `GET /organoids/:id` renvoie les informations détaillées d'un organoïde spécifique en fonction de son identifiant unique (`id`). Les informations retournées incluent des liens vers l'image originale et le masque de segmentation, ainsi que des données d'analyse telles que la surface du masque, le contraste et la luminosité.

Ces endpoints API permettent un accès structuré aux données d’organoïdes, fournissant au frontend les informations nécessaires pour l’affichage et l’analyse.

### B. Composants React
- **Image Viewer Component** : permet de charger et afficher les images des organoïdes, ainsi que les masques de segmentation superposés.
- **Metrics Panel Component** : récupère et affiche les métriques en temps réel pour chaque image chargée, facilitant l’analyse.

### C. Intégration de la Base de Données MongoDB
La base de données MongoDB est utilisée pour stocker les images, les masques de segmentation et les métadonnées des organoïdes. Ce stockage assure une gestion des données rapide et optimisée pour des volumes importants d’images.