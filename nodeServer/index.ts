import express, { Request, Response } from 'express';
import { query } from './src/db';
import crypto from 'crypto';
import { getIp, parseIp } from './src/eth0';

const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get('/info', async (req:Request, res:Response) => {
  // console.log(`Hello World! My ip: ${getIp()}, Your ip: ${parseIp(req)}`)
  res.status(200).send(`Hello World! My ip: ${getIp()}, Your ip: ${parseIp(req)}`)
  
});


app.get('/me/:name', async (req:Request, res:Response) => {

  try {
    const result = await query('SELECT * FROM users WHERE name=$1', [req.params.name],parseIp(req))
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
    `, [name, email, phone, address, crypto.randomUUID()], parseIp(req))
  
    return res.json(result.rowCount)
    
  } catch (error) {
    if (error.code === '23505'){
      return res.status(400).send('This email already exists')
    }
    res.status(500).send(error.detail)
  }

})



const port = process.env.NODE_SERVER_PORT;
app.listen(port, async () => {


  try {
    query(`
    INSERT INTO log_pods (queyryPodIp, serverPodIp)
    VALUES ($1, $2)
    `, ['start',getIp()], 'start2')
  
  } catch (error) {
    console.log(error)
  }

  return console.log(`Express is listening at http://localhost:${port}`);
});