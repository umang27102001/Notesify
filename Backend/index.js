//This is Express Server.
const express = require('express')
var cors=require('cors'); 
const connectToMongo=require('./db');
connectToMongo();
const app = express()
app.use(cors());
const port = 5000

app.use(express.json());
//Available routes
app.use("/api/auth",require('./Routes/auth'));
app.use("/api/notes",require('./Routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})