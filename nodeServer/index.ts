import express, { Request, Response } from 'express';
import { query, nets } from './src/db';
import crypto from 'crypto';


const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 



app.get('/me/:name', async (req:Request, res:Response) => {

  try {
    const result = await query('SELECT * FROM users WHERE name=$1', [req.params.name])
    if (result.rowCount === 0){
      return res.status(404).send("User not found")
    }
    return res.json(result.rows[0])
    
  } catch (error) {
    return res.status(500).send(error.detail)
  }
  
});

app.post('/register', async(req:Request, res:Response)=>{
  const {name, email, phone, address} = req.body

  try {
    const result = await query(`
    INSERT INTO users (name, email, phone, address, uuid)
    VALUES ($1, $2, $3, $4, $5)
    `, [name, email, phone, address, crypto.randomUUID()])
  
    return res.json(result.rowCount)
    
  } catch (error) {
    if (error.code === '23505'){
      return res.status(400).send('This email already exists')
    }
    res.status(500).send(error.detail)
  }

})



const port = 3000;
app.listen(port, async () => {


  try {
    query(`
    INSERT INTO log_pods (queyryPodIp, serverPodIp)
    VALUES ($1, $2)
    `, ['start',nets.eth0.at(0).address || 'error'])
  
  } catch (error) {
    console.log(nets)
  }

  return console.log(`Express is listening at http://localhost:${port}`);
});