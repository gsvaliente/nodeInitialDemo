
const mongoose = require('mongoose');
const  { Rooms } = require('../models/Rooms');


module.exports = async () => {
    
    try {
    let mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Connected to ${process.env.DB_NAME} DB`);
    
    // Crea un documento en la colección Rooms para inicializar la BDD
    const found = await Rooms.findOne({roomName:'Welcome'});
    if(!found) {
        const room = await Rooms.create({roomName:'Welcome'});
    }
} catch (err) {
        console.log(err.message);
    }
}