import {v4 as uuidv4} from "uuid"

const generarId = ()=>{
    // tambien puede hacerse con Math.random.toString(32)
    return uuidv4()
}

export default generarId