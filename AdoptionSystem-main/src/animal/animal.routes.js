import express from 'express'
import { testA, registerA, showAnimals, searchAnimal, updateAnimal, deleteA} from './animal.controller.js';

const api = express.Router()

api.get('/testA', testA)
api.post('/registerA', registerA)
api.get('/showAnimals', showAnimals)
api.put('/updateAnimal/:id', updateAnimal)
api.get('/searchAnimal/:id', searchAnimal)
api.delete('/deleteA/:id', deleteA)

export default api