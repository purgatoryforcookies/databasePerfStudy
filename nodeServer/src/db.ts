import { Pool, QueryResult } from "pg";
import { getIp } from "./eth0";




const client = new Pool({
    host: process.env.DB_HOST,
    port: 5432,
    database: 'db',
    user: 'perfStudy',
    password: 'perfStudy',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
 } );


 export const query = 
 (text:string, 
    params:string[]):Promise<QueryResult<any>> => {

    try {
        client.query(`
        INSERT INTO log_pods (queyryPodIp, serverPodIp)
        VALUES ($1, $2)
        `, ['test', getIp()])
    } catch (error) {
        throw new Error(error.detail)
    }

    return client.query(text, params)
  }
