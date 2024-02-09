'use strict' // usamos el modo estricto

import Animal from './animal.model.js'
import {checkUpdate} from './utils/validator.js'

export const testA = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const registerA = async(req, res)=> {
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
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err: err})
    }
    }

    export const showAnimals = async (req, res) => {
        try {
            let animals = await Animal.find();
            return res.send({ animals });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error show animals', err: err });
        }
    }

    export const searchAnimal = async (req, res) => {
        try {
            // Obtener el ID del animal a buscar desde los parámetros de la solicitud
            const { id } = req.params;
    
            // Buscar el usuario por su ID
            const animal = await Animal.findOne({_id: id});
    
            // Verificar si se encontró el usuario
            if (!animal) {
                return res.status(404).send({ message: 'Animal not found' });
            }
    
            // Devolver el usuario encontrado
            return res.send({ animal });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error searching for animal', error: err });
        }
    };

    export const updateAnimal = async (req, res)=>{
        try {
            //Obtener el id del animal a actualizar
            let { id } = req.params
            //Obtener los datos al actualizar
            let data = req.body
            //Validar si tiene datos
            let update = await checkUpdate(data, id)
            if(!update) return res.status(400).send({message: 'Have submitted some data that connot be updated or missing data'})
            //Actualizar (DB)
            let updateAnimal = await Animal.findOneAndUpdate(
                {_id: id}, //Objects id <- hexadecimales (hora system, Version Mongo, Llave primaria . . .)
                data,//Datos que se van a actualizar
                {new: true}//Objeto de la DB ya actualizado
                )
    
            //Validar la actualizacion
            if (!updateAnimal) return res.status(400).send({message: 'Animal not found and not updated'})
    
            //Respondo al keeper
            return res.send({message: 'Updated Animal', updateAnimal})
    
        } catch (err) {
            console.error(err)
            if(err.keyValue.name) return res.status(400).send({message: `Name ${err.keyValue.name} is already taken`})
            return res.status(500).send({message: 'Error updating animal account'})
        }
    
    }

    export const deleteA = async(req, res)=>{
        try {
            //Obtener el id
            let { id } = req.params
        
            //Eliminar (deleteOne // findOneAndDelete)
            let deleteAnimal = await Animal.findOneAndDelete({_id: id})
            
            //Verificar que se elimino
            if(!deleteAnimal) return res.status(404).send({message: 'Account not found and not deleted'})
            
            //Responder
            return res.send({message: `Account with name ${deleteAnimal.name} deleted successfully`})//status 200
        } catch (err) {
            console.error(err)
            return res.status(500).send({message: 'Error deleting animal account'})
        }
    }