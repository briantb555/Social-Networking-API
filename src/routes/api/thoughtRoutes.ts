import { Router } from 'express';
const router = Router();
import {
getAllThoughts,
getThoughtById,
createThought,
updateThought,
deleteThought,
addReaction,
deleteReaction,
} from '../../controllers/thoughtController';

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
.post(addReaction)
.delete(deleteReaction);

export const thoughtRouter = router;