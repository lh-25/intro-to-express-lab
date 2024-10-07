const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})

//1. Be Polite, Greet the User
app.get('/greeting/:username', (req, res) => {
    res.send({
        msg: `Welcome to my page ${req.params.username}!`
        })
})
// 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const {number} = req.params
    if (isNaN(number)){
        res.send('You have to enter a valid number')
    }else {
    const maxNumber = parseInt(number)
    const rolledNumber = Math.floor(Math.random() * (maxNumber + 1))

    res.send(`You rolled ${rolledNumber}`)}
})


// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
app.get('/collectibles/:index',(req, res) => {
    const {index} = req.params
    const itemIndex = parseInt(index)

    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex > collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!')
    }
const item = collectibles[itemIndex]

res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`)
   
})


// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/shoes', (req, res) => {
    const {minPrice,maxPrice, type} = req.query
    let filteredShoes = shoes

    if (minPrice) {
       const min = parseFloat(minPrice)
       filteredShoes = filteredShoes.filter(shoes => shoes.price >= min)
    } 
    if (maxPrice) {
        const max = parseFloat(maxPrice)
        filteredShoes = filteredShoes.filter(shoes => shoes.price <= max)
     } 

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }

    res.send(filteredShoes)
});



app.get('/*', (req, res) => {
    res.send ({
        error: '404 file not found'
    })
})