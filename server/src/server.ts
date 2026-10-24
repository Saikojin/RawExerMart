import { app } from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🏋️  RawExerMart API Server running on port ${PORT}`);
  console.log(`🌐  Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦  Equipment API: http://localhost:${PORT}/api/equipment`);
  console.log(`===============================================`);
});
