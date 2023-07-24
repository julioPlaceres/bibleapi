import { Router } from 'express';
import { getLocations, getLocation, createLocation, updateLocation, deleteLocation } from '../controllers/LocationController';

const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocation);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
