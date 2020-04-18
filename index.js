const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const config = require('config')
const todoRoutes = require('./routes/todos')
const path = require('path')
const defaultPort = config.get('serverConfig.defaultPort')
const connectionStr = config.get('dbConfig.connectionStr')


const PORT = process.env.PORT || defaultPort

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server has been started')
        })        
    } catch (e) {
        console.log(e)
    }
}

start()

