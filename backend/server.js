const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000; // You can use any port you like
const roomsRouter = require('./controllers/rooms')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.post('/api/message', (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);
    res.json({ received: true, message: `Server received: ${message}` });
  });

  app.use("/",roomsRouter)

app.listen(port, () => {
  console.log(`server listen to ${port}`);
});