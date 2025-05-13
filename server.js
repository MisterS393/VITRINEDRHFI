// Importer le module Express
import express from 'express';

const app = express();

// Définir le port (par défaut 3000)
const PORT = process.env.PORT || 3000;

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Node.js !');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
