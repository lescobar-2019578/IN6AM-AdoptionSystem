'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, chekPassword, checkUpdate} from './utils/validator.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully ,  can be logged with username use ${user.username}` })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async (req, res)=>{
    try{
        //Capturar los datos(login)
        let {username, password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username})//buscar un solo registro
        //Verifico que la contraseña coincida
        if(user && await chekPassword(password, user.password)){
            let loggedUser ={
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responder al usuario
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser})
        }
        if(!user) return res.statu(404).send({message: 'User not found'})
        //Responde al usuario
        return res.send({message: `Welcome ${user.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async (req, res)=>{
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos al actualizar
        let data = req.body
        //Validar si tiene datos
        let update = await checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that connot be updated or missing data'})
        //Validar si tiene permisos (tokenizacion) X hoy no lo vemos X

        //Actualizar (DB)
        let uptdatedUser = await User.findOneAndUpdate(
            {_id: id}, //Objects id <- hexadecimales (hora system, Version Mongo, Llave primaria . . .)
            data,//Datos que se van a actualizar
            {new: true}//Objeto de la DB ya actualizado
            )

        //Validar la actualizacion
        if (!uptdatedUser) return res.status(400).send({message: 'User not found and not updated'})

        //Respondo al usuario
        return res.send({message: 'Updated User', uptdatedUser})

    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }

}

export const deleteU = async(req, res)=>{
    try {
        //Obtener el id
        let { id } = req.params

        //Validar si esta logeado y es el mismo 

        //Eliminar (deleteOne // findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        
        //Verificar que se elimino
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
        
        //Responder
        return res.send({message: `Account with username ${deleteUser.username} deleted successfully`})//status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
