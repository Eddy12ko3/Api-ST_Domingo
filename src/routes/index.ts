import { Router } from 'express';
import { readdirSync } from 'node:fs';

const router = Router();
const PATH = `${__dirname}`;

const cleanFileName = (filename: string) => {
	const file = filename.split('.').shift();
	return file;
};
readdirSync(PATH).filter((filename) => {
	const cleanName = cleanFileName(filename);
	if (cleanName !== 'index') {
		import(`./${cleanName}`).then((moduleRouter) => {
			router.use(`/${cleanName}`, moduleRouter.router);
		});
	}
});

export { router };
