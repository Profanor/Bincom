"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPollingUnitAndResults = exports.fetchTotalResult = exports.fetchLGAs = exports.getPollingUnitResult = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
// Open a connection to the SQLite database file
const db = new sqlite3_1.default.Database('./data/bincom_test.sqlite');
const getPollingUnitResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueId = req.params.uniqueId;
    // Query the database to get the polling unit result
    db.all(`SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid = ?`, [uniqueId], (err, rows) => {
        if (err) {
            console.error('Error retrieving polling unit result:', err);
            res.status(500).json({ error: 'An error occurred while retrieving polling unit result.' });
            return;
        }
        let results;
        res.render('pollingunitresult', { rows });
    });
});
exports.getPollingUnitResult = getPollingUnitResult;
// Controller function to fetch LGAs
const fetchLGAs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    db.all('SELECT lga_id AS id, lga_name AS name FROM LGA', (err, rows) => {
        if (err) {
            console.error('Error fetching LGAs:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows);
    });
});
exports.fetchLGAs = fetchLGAs;
const fetchTotalResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lgaId = req.query.lgaId;
    db.get('SELECT SUM(apr.party_score) AS total FROM announced_pu_results AS apr JOIN polling_unit AS pu ON apr.polling_unit_uniqueid = pu.uniqueid WHERE pu.lga_id = ?', [lgaId], (err, row) => {
        if (err) {
            console.error('Error fetching total result:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ total: row.total });
    });
});
exports.fetchTotalResult = fetchTotalResult;
const createPollingUnitAndResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uniqueId, wardId, lgaId, stateId, results } = req.body;
    // Insert the new polling unit into the database
    db.run(`INSERT INTO polling_unit (unique_id, ward_id, lga_id, state_id) VALUES (?, ?, ?, ?)`, [uniqueId, wardId, lgaId, stateId], (err) => {
        if (err) {
            console.error('Error inserting polling unit:', err);
            res.status(500).json({ error: 'An error occurred while inserting polling unit.' });
            return;
        }
        // Insert the results for the new polling unit into the database
        results.forEach(({ partyAbbreviation, partyScore }) => {
            db.run(`INSERT INTO announced_pu_results (polling_unit_uniqueid, party_abbreviation, party_score) 
              VALUES (?, ?, ?)`, [uniqueId, partyAbbreviation, partyScore], (err) => {
                if (err) {
                    console.error('Error inserting polling unit result:', err);
                    res.status(500).json({ error: 'An error occurred while inserting polling unit result.' });
                    return;
                }
            });
        });
        res.send('Polling unit and results stored successfully.');
    });
});
exports.createPollingUnitAndResults = createPollingUnitAndResults;
