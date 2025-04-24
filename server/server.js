// Step 1 import the modules
const express = require('express');
const app = express(); // create an instance of express
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

// const authRouter = require('./routes/auth'); // import the auth router
// const categoryRouter = require('./routes/category');

// middleware
app.use(morgan('dev')); // log the request 
app.use(express.json({ limit: '20mb' })); // parse the request body 
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// app.use('/api', authRouter);
// app.use('/api', categoryRouter)

// Step 3  Create the Router
// app.post('/api', (req, res) => {
//     console.log(username); // log the request body
//     res.send('Hello World.'); // send the response
// });

// Step 2 Start the server
app.listen(5000, () => console.log('Server is running on http://127.0.0.1:5000'));