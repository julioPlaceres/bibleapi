import { Router } from 'express';
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/BookController';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
