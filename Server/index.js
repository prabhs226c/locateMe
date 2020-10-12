const express = require('express');
const cors= require('cors');
const httpHandler = require('./src/HTTPHandler');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/newData',httpHandler.insertLocation);
app.get('/updateData',httpHandler.updateData);
app.get('/getData',httpHandler.getData);
app.get('/getLocation',httpHandler.getLocation);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
