import express from 'express';
import ProductRoutes from './routes/products.routes';
import UserRoutes from './routes/user.routes';
import OrderRoutes from './routes/orders.routes';

const app = express();

app.use(express.json());

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);

export default app;
