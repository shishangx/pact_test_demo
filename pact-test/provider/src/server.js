const express = require('express');
const app = express();
const port = 9999;

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 1) {
    res.json({ id: 1, name: 'Lisa', email: 'lisa@example.com', age: 30 });
  } else {
    res.status(404).send('User not found');
  }
});

const server = app.listen(port, () => {
  console.log(`Provider server running at http://127.0.0.1:9999`);
});

module.exports = { app, server };
