const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

//Darle acceso a origenes en especifico con cors
const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin)){
      callback(null, true);
    } else{
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options));


app.get('/', (req, res) => {
  res.send('Hola, mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, esta es una nueva ruta');
});

routerApi(app);
//Usar middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     });
//   } else{
//     res.send('No hay parametros');
//   }
// });


// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId
//   });
// })


app.listen(port, () => {
  console.log('My port' + port);
});
