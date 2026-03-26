import "dotenv/config";
import './config/connection.js'
import express from "express";
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({origin: [process.env.CLIENT_ORIGIN, 'http://localhost:5173' ]}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`);
});
