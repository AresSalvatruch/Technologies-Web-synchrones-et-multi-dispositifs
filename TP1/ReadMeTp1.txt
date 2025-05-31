# TP1-  Technologies Web synchrones et multi-dispositifs

## Description du TP :

Ce projet est un exemple d'application composée de deux parties :

- Un serveur développé avec Node.js, Express et TypeScript.
- Un client développé avec React, Vite, Tailwind CSS .

## Prérequis

- Node.js (version 18 ou +)
- Yarn 
## Installation des dépendances

###  Côté serveur (`TP1/server`)
yarn install

#### Dépendances utilisées côté serveur :

```json
"dependencies": {
  "express": "^4.18.x"
},
"devDependencies": {
  "typescript": "^5.x",
  "ts-node": "^10.x",
  "@types/node": "^20.x",
  "@types/express": "^4.x"
}
```


### Côté client (`TP1/client`)
yarn install

#### Dépendances utilisées côté client :

```json
"dependencies": {
  "react": "^18.x",
  "react-dom": "^18.x",
  "shadcn/ui": "latest",
  "tailwindcss": "^3.x"
},
"devDependencies": {
  "vite": "^5.x",
  "typescript": "^5.x"
}
