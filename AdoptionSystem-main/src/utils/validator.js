'use strict'

import { hash } from "bcrypt"


//encriptar la contraseña
export const encrypt =  async(password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}
