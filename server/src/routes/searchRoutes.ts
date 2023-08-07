import { Router } from 'express';
import { searchEntities } from '../controllers/SearchController';

const router = Router();

router.post('/', searchEntities);

export default router;