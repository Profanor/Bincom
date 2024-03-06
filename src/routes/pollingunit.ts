import express from 'express'
import { createPollingUnitAndResults, fetchLGAs, fetchTotalResult, getPollingUnitResult } from '../controllers/pollingUnitController';

const router = express.Router() 

// Question 1: Display result for an individual polling unit
router.get('/polling-unit/:uniqueId', getPollingUnitResult)

// Question 2:
// display page with checkbox first then display summed total result of all polling units under a particular local government
router.get('/choose-lga', (req, res)=> {
res.render('selectLga');
});
router.get('/lgas', fetchLGAs);
router.get('/totalResult', fetchTotalResult);

// Question 3: Store results for all parties for a new polling unit
router.post('/polling-unit', createPollingUnitAndResults);

export default router;
