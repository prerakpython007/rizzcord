import cors from 'cors';

// ...existing code...

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,  // Required for cookies, authorization headers with HTTPS
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ...existing code...