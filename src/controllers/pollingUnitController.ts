import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

// Open a connection to the SQLite database file
const db = new sqlite3.Database('./data/bincom_test.sqlite');

export const getPollingUnitResult = async (req: Request, res: Response) => {
  const uniqueId = req.params.uniqueId;

  // Query the database to get the polling unit result
  db.all(`SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid = ?`, [uniqueId], (err, rows) => {
    if (err) {
      console.error('Error retrieving polling unit result:', err);
      res.status(500).json({ error: 'An error occurred while retrieving polling unit result.' });
      return;
    }
    let results: any;
    res.render('pollingunitresult',  {rows} );
  });
};

// Controller function to fetch LGAs
export const fetchLGAs = async (req: Request, res: Response) => {
  db.all('SELECT lga_id AS id, lga_name AS name FROM LGA', (err, rows) => {
      if (err) {
          console.error('Error fetching LGAs:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(rows);
  });
}

export const fetchTotalResult = async (req: Request, res: Response) => {
  const lgaId = req.query.lgaId;
  db.get('SELECT SUM(apr.party_score) AS total FROM announced_pu_results AS apr JOIN polling_unit AS pu ON apr.polling_unit_uniqueid = pu.uniqueid WHERE pu.lga_id = ?', [lgaId], (err, row: any) => {
      if (err) {
          console.error('Error fetching total result:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json({ total: row.total });
  });
}


export const createPollingUnitAndResults = async (req: Request, res: Response) => {
  const { uniqueId, wardId, lgaId, stateId, results } = req.body;

  // Insert the new polling unit into the database
  db.run(`INSERT INTO polling_unit (unique_id, ward_id, lga_id, state_id) VALUES (?, ?, ?, ?)`, 
         [uniqueId, wardId, lgaId, stateId], (err) => {
    if (err) {
      console.error('Error inserting polling unit:', err);
      res.status(500).json({ error: 'An error occurred while inserting polling unit.' });
      return;
    }
    
      // Insert the results for the new polling unit into the database
      results.forEach(({ partyAbbreviation, partyScore }: { partyAbbreviation: string; partyScore: number }) => {
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
};
