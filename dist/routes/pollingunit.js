"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pollingUnitController_1 = require("../controllers/pollingUnitController");
const router = express_1.default.Router();
// Question 1: Display result for an individual polling unit
router.get('/polling-unit/:uniqueId', pollingUnitController_1.getPollingUnitResult);
// Question 2:
// display page with checkbox first then display summed total result of all polling units under a particular local government
router.get('/choose-lga', (req, res) => {
    res.render('selectLga');
});
router.get('/lgas', pollingUnitController_1.fetchLGAs);
router.get('/totalResult', pollingUnitController_1.fetchTotalResult);
// Question 3: Store results for all parties for a new polling unit
router.post('/polling-unit', pollingUnitController_1.createPollingUnitAndResults);
exports.default = router;
