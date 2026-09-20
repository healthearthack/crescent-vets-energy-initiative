/**
 * Crescent Vets Energy Initiative - Lightweight Express API Microservice
 * Provides real-time query endpoints for Veterans MOS crosswalk and Islamic Waqf trust allocations.
 */

import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load precomputed welfare artifacts
const loadWelfareData = (filename: string) => {
  const filePath = path.join(__dirname, '..', 'welfare', filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return null;
};

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    service: 'crescent-vets-energy-initiative',
    framework: 'Express TypeScript Microservice',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/vets/crosswalk', (req: Request, res: Response) => {
  const data = loadWelfareData('veterans_transition_pathway.json');
  if (!data) return res.status(500).json({ error: 'Welfare data not generated yet' });
  
  const queryRating = req.query.rating as string;
  if (queryRating) {
    const filtered = data.career_pathways.filter((item: any) => 
      item.service_rating.toLowerCase().includes(queryRating.toLowerCase()) ||
      item.branch.toLowerCase().includes(queryRating.toLowerCase())
    );
    return res.json({ matches: filtered });
  }
  res.json(data);
});

app.get('/api/welfare/waqf-ledger', (req: Request, res: Response) => {
  const data = loadWelfareData('waqf_trust_ledger.json');
  if (!data) return res.status(500).json({ error: 'Waqf ledger not generated yet' });
  res.json(data);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🌙 Crescent Vets Express Microservice running on http://localhost:${PORT}`);
  });
}

export default app;
