const express = require('express');
const { sequelize } = require('./models');
const employeeRouter = require('./routers/employeeRouter');
const availabilityRouter = require('./routers/availabilityRouter');
const categoryRouter = require('./routers/categoryRouter');
const serviceRouter = require('./routers/serviceRouter');
const adminRouter = require('./routers/adminRouter');
const appointmentRouter = require('./routers/appointmentRouter')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use('/images', express.static('./Images'));
app.use(cors());

app.use('/employee', employeeRouter);
app.use('/availability', availabilityRouter);
app.use('/category', categoryRouter);
app.use('/service', serviceRouter);
app.use('/admin', adminRouter);
app.use('/appointment', appointmentRouter);

app.listen({ port: 5000 }, async () => {
  console.log(`Server listening on port 5000 !`);
  await sequelize.authenticate();
  console.log('Database Connected!');
});
