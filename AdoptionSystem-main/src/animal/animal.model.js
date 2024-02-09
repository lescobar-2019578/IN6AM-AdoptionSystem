import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    keeper:{
        type: String,
        required: true
    },
    nameAnimal:{
        type: String,
        required: true
    },
    race:{
        type: String,
        required: true
    },
    paw: {
        type: String,
        required: true,
        minLength: 2
    },
    typeAnimal: {
        type: String,
        uppercase: true,
        enum: ['WILD', 'DOMESTIC']
    }
})

export default mongoose.model('animal', animalSchema)