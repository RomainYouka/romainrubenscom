# 📄 Dossier des CV/Résumés

## Comment ajouter vos fichiers PDF

### Étape 1: Préparez vos fichiers PDF
Renommez vos fichiers PDF avec les noms suivants :
- **Version française** : `RUBENS-Romain-curriculum-vitae.pdf`
- **Version anglaise** : `RUBENS-Romain-Resume.pdf`
- **Version arménienne** : `resume-hy.pdf`

### Étape 2: Ajoutez les fichiers dans ce dossier
1. Ouvrez l'explorateur de fichiers de votre projet
2. Naviguez vers : `public/resumes/`
3. Glissez-déposez (drag & drop) vos 3 fichiers PDF ici
4. Ou faites un clic droit → "Coller" si vous les avez déjà copiés

### Structure finale attendue :
```
public/
└── resumes/
    ├── RUBENS-Romain-curriculum-vitae.pdf  ← Version française
    ├── RUBENS-Romain-Resume.pdf            ← Version anglaise
    └── resume-hy.pdf                        ← Version arménienne
```

## ⚠️ Important
- Respectez exactement les noms de fichiers ci-dessus
- Les fichiers doivent être au format PDF
- Une fois ajoutés, les boutons de téléchargement fonctionneront automatiquement

## 🔄 Si vous voulez utiliser d'autres noms de fichiers
Modifiez le fichier `src/components/sections/global-navigation.tsx` (lignes 257-259)
