import { Router } from 'express';
import { getRivers, getRiver, createRiver, updateRiver, deleteRiver } from '../controllers/RiverController';

const router = Router();

router.get('/', getRivers);
router.get('/:id', getRiver);
router.post('/', createRiver);
router.put('/:id', updateRiver);
router.delete('/:id', deleteRiver);

export default router;
