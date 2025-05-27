import express from 'express';
import { HelloRouteur } from './routes/hello.router';
import path from 'path' 

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}\n`);
});

app.use('/hello', HelloRouteur); 
// Chemins vers le build client
const DIST_DIR  = path.join(__dirname, '../../client/dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// ⿡ Servir les fichiers statiques générés par Vite
app.use(express.static(DIST_DIR))

// ⿢ Catch-all : pour toute autre route, renvoyer l'index du client
 app.get(/.*/, (_req, res) => {
   res.sendFile(HTML_FILE)
 })

// Cela permet de gérer les requêtes vers /hello
app.use('/hello', HelloRouteur);