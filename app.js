const express = require('express')
const app = express();
const port = 8000
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/con', { useNewUrlParser: true, useUnifiedTopology: true });
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
});
const Contact = mongoose.model('Kitten', contactSchema);
//express
app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))
    //pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('home.pug', param)
})
app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param)
})
app.get('/info', (req, res) => {
    const param = {}
    res.status(200).render('info.pug', param)
})
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('This item has been saved to the database')
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    })
})
app.listen(port, () => {
    console.log(`listening at ${port}`)
})