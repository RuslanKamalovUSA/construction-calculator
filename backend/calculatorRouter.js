import Router from 'express';
import controller from '../backend/calculatorController.js'

const router = new Router();

router.get('/calculator', controller.getCalculator)

export default router;