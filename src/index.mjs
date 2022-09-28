import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 3001;

const calculate = (operation, x, y) => {
  switch (operation) {
      case 'add':
          return Number(x) + Number(y);
      case 'sub':
          return Number(x) - Number(y);
      case 'mul':
          return Number(x) * Number(y);
      case 'div':
          return Number(x) / Number(y);
      default:
          return 'Operação inválida, tente novamente com: add, sub, mul ou div + 2 números inteiros'; 
  }
};

app.get('/', (req, res) => {
  res.send('Operações: add, sub, mul, div. </br> Exemplo: /add/1/2, /sub/1/2, /mul/1/2, /div/1/2');
});

app.get('/:operation/:x/:y', (req, res) => {
    const { operation, x, y } = req.params;
    const result = calculate(operation, x, y);
    res.send(result.toString());
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
