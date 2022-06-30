import Fastify from 'fastify';
import path from 'path';
import { readFile } from 'fs/promises';

const engine = Fastify({
    logger: true,
});

function getPageContent() {
    const pageName = 'MainPage';
    const pagePath = path.join('/home/romaro/react-spa/project/_web/views', pageName + '.html');
    return readFile(pagePath, { encoding: 'utf8' });
}

engine.get('/', async (_req, res) => {
    const pageContent = await getPageContent();
    res.header('content-type', 'text/html; charset=utf-8').send(pageContent);
});

engine.get('/js', async (_req, res) => {
    const pageContent = await getPageContent();
    res.header('content-type', 'application/javascript').send(pageContent);
});

engine.listen({ port: 3000 }, (err) => {
    if (err) throw err;
});
