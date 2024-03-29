import datos from "./config.json" with {type: 'json'};
import Express from 'express';
import path from 'node:path';


const __dirname = import.meta.dirname;
const app = Express();
const PUERTO = 3000;

app.use(Express.json());
app.use(Express.static(path.join(__dirname, 'frontend')));
app.get('/configurationes', (_, res) => { res.json({ datos }); });


app.listen(PUERTO, () => { 
  console.log(`Asistente en la pagina http://localhost:${PUERTO}`); 
});
