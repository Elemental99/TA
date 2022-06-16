import mongoose from 'mongoose';

export const dbConnection = async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_DB_CNN}`);
		console.log('Base de datos conectada, correctamente');
	} catch (error) {
		console.log('No se pudo conectar a base de datos');
		throw new Error('Error al conectar a la base de datos');
	}
};
