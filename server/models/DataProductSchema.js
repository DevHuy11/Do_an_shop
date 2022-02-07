//reqire module mongoose
const mongoose = require('mongoose')

//Initialize variable for Schemas

const reqString = {
    type: String,
    required: true
}
const reqNumber = {
    type: Number,
    required:true,
}
const DateNow =
{
    type: Date,
    required: true,
    default: Date.now
}
//Initialize Schema for product

const newSchema = new mongoose.Schema({
    foodName:reqString,
    images:
        [{
            _id: false,
            imageUrl: String
        }],
    description: reqString,
    price: reqNumber,
    createdAt:DateNow,
    updatedAt: DateNow
})

const Chicken = mongoose.model('chickens', newSchema)
const Dumplings = mongoose.model('dumplings', newSchema)
const Hamburger = mongoose.model('hamburgers', newSchema)
const Noodle = mongoose.model('noodles', newSchema)
const Pancakes = mongoose.model('pancakes', newSchema)
const Cupcakes = mongoose.model('cupcakes', newSchema)
const Salad = mongoose.model('salads', newSchema)
const Sushi = mongoose.model('sushis', newSchema)
const Pizza = mongoose.model('pizzas', newSchema)

//Export module

module.exports = {
    Chicken,
    Dumplings,
    Hamburger,
    Noodle,
    Pancakes,
    Cupcakes,
    Salad,
    Sushi,
    Pizza,
}





