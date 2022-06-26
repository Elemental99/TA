import mongoose, { model, Schema } from 'mongoose'
import { IMenu } from '../interfaces'

const MenuSchema: mongoose.Schema = new Schema<IMenu>({
    idbar  : {
        type: Schema.Types.ObjectId,
        ref : 'Bar',
    },
    idplato: {
        type: Schema.Types.ObjectId,
        ref : 'Plato',
    },
    precio : Number,
})

const Menu: mongoose.Model<IMenu> = model<IMenu>('Menu', MenuSchema)

export default Menu
