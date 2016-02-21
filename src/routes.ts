import {Router} from 'express';
import index from './controllers/index';
import auth from './controllers/auth';
import files from './controllers/files';

const router = Router();
router.get('/', index.indexAction);
router.get('/quickstart', index.quickstartAction);
router.get('/files/all', files.all);
router.get('/files/images', files.images);
router.get('/files/pages', files.pages);
router.get('/files/documents', files.documents);
router.post('/auth/login', auth.login);

export default router;
