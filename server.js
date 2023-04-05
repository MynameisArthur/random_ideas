const express = require('express');

const port = 5000;

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Random Ideas' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
