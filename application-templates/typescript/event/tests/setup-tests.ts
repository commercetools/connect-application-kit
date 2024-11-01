import { config } from 'dotenv';
config();
config({ path: `.env.local`, override: true });
