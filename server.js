const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

/* listening port settings */
app.listen(PORT, () =>
  console.log(`STARTUP INFO - server stated on port:${PORT}`)
);

/* connect to DB */
connectDB();

/* init the middleware */
app.use(express.json({ extended: false }));

/*
 * define the routes we will utilise from the routes
 * folder of the API application.
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) =>
  res.json({ message: 'Welcome to the ContactKeeper API' })
);
