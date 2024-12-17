import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../../controllers/thoughtController';
const router = Router();
// /api/thoughts
router.route('/api/thoughts')
    .get(getAllThoughts)
    .post(createThought);
// /api/thoughts/:id
router.route('/api/thoughts:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
export default router;
