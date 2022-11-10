import app from './app';

const PORT = 3004;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT} Vamos aprender ao máximo`,
));

export default server;
