import express from 'express';
import { routes } from './routes';

const app = express();
app.use(express.json());
// get - buscar informaçoes , post - cadastrar informaçoes, put - atualizar informaçoes, delete - deletar informaçoes, patch - atualizar parcialmente

app.use(routes);

app.listen(3333, () => {
	console.log('HEROU');
});

// SQLite
