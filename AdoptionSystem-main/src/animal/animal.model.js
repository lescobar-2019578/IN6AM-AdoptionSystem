import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    keeper:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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