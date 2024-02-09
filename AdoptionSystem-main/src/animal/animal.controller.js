'use strict' // usamos el modo estricto

import animal from './animal.model.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=> {
    try {
        //Capturamos los datos
        let data = req.body
        // Asignamos el tipo de animal DOMESTICO por defecto
        data.role = 'DOMESTIC'
        //Guardamos la informacion
        let animal = new Animal(data)
        await animal.save()
        //Respondemos al keeper
        return res.send({message: `Registered successfully, `})
    } catch (error) {
        
    }
}