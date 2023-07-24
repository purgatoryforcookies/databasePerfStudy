import { Pool, QueryResult } from "pg";
import { getIp } from "./eth0";




let pool:Pool = null

const getPool =async ()=>{
    if(!pool){

        pool = new Pool({
            host: process.env.DB_HOST,
            port: 5432,
            database: 'db',
            user: 'perfStudy',
            password: 'perfStudy',
            max: 40,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        } );
        await pool.connect()
    }

    return pool
}




 export const query = 
 async (text:string, 
    params:string[], senderIp:string):Promise<QueryResult<any>> => {
        const pol = await getPool()
    try {
        pol.query(`
        INSERT INTO log_pods (queyryPodIp, serverPodIp)
        VALUES ($1, $2)
        `, [senderIp, getIp()])
    } catch (error) {
        throw new Error(error.detail)
    }

    const mes = pol.query(text, params)


    return mes
  }
