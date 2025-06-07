require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Routes
const contactRoutes = require('./routes/contacts');
const vehicleRoutes = require('./routes/vehicles');
app.use('/contacts', contactRoutes);
app.use('/vehicles', vehicleRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 Middleware
app.use((req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

// DB Connection and Server Start
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error(err));
