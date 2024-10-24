import express from 'express';
import VlogController from '../../controllers/Content/vlog.controller';
import AuthenticationMiddleware from '../../middlewares/authenticate';

const router = express.Router();
const vlogController = new VlogController();
const authenticationMiddleware = new AuthenticationMiddleware();

// Get a specific vlog
router.get('/:id', authenticationMiddleware.authenticateUser, (req, res) => vlogController.getVlog(req, res));

// Create a new vlog
router.post('/', authenticationMiddleware.authenticateUser, (req, res) => vlogController.createVlog(req, res));

// Update an existing vlog
router.put('/:id', authenticationMiddleware.authenticateUser, (req, res) => vlogController.updateVlog(req, res));

// Delete a vlog
router.delete('/:id', authenticationMiddleware.authenticateUser, (req, res) => vlogController.deleteVlog(req, res));

export default router;
