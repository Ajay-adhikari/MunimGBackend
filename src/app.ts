import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import log from './logs/log';
import sequelize from './config/database';
import "./models/User"
// Routes
import UserRoutes from './routes/UserRoutes';
import ShopRoutes from './routes/ShopRoutes';
import InventoryRoutes from './routes/InventoryRoutes'
import salesRoutes from './routes/SalesRoutes';

const app = express();
//middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/shop', ShopRoutes);
app.use('/inventory', InventoryRoutes);
app.use('/sales', salesRoutes);

// databse syncing
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

//Routes
app.get('/', () => {
  log.info("hello world, Welcome to MunimApp");
});

export default app;
