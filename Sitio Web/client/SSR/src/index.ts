import express from 'express'
import path from 'path'
import { config } from 'dotenv'
import exphbs from 'express-handlebars'
import userRoute from './routes/user'
import CookieParser from 'cookie-parser'
import methodOverride from 'method-override'

config( { path: './src/.env' } )

// Initializations
const app  = express()
const PORT = process.env.PORT || 3600

// settings
app.set( 'views', path.join( __dirname, 'views' ) )

app.engine( '.hbs', exphbs( {
    extname      : '.hbs',
    defaultLayout: 'main',
    layoutsDir   : path.join(
        app.get( 'views' ),
        'layouts',
    ),
    partialsDir: path.join(
        app.get( 'views' ),
        'partials',
    ),
} ) as any )
app.set( 'view engine', '.hbs' )

// middlewares
app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )
app.use( CookieParser() )
app.use( methodOverride() )

// Routes
app.use( userRoute )

// Static files
app.use( express.static( path.join( __dirname, 'public' ) ) )

// Starting the Server
app.listen( PORT, () => {
    console.log( 'Server on port', PORT )
} )
