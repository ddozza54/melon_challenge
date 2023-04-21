import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Song";
import app from "./server";

// const PORT = process.env.PORT || 5000;
const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
