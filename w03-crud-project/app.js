const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');

dotenv.config();
const app = express();
app.use(express.json());

const contactsRoutes = require('./routes/contacts');
const vehiclesRoutes = require('./routes/vehicles');

app.use('/contacts', contactsRoutes);
app.use('/vehicles', vehiclesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 3000, () => console.log('Server running')))
  .catch(err => console.error(err));
