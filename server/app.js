// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api', userRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
