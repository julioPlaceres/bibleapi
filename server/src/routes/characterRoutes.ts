import { Router } from 'express';
import { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter } from '../controllers/CharacterController';

const router = Router();

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

export default router;
