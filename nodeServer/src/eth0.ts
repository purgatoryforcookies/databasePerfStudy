import {networkInterfaces} from 'os'

const nets = networkInterfaces();


export const getIp = () =>{

    const containerCase = nets.eth0?.at(0).address

    if (!containerCase) { 
        const hostCase = nets.Ethernet.at(-1).address
        if (hostCase) return hostCase
        return 'error'
    }

    return containerCase




}


