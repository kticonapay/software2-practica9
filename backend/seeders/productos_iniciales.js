// backend/seeders/productosIniciales.js

const mongoose = require('mongoose');
const Producto = require('../models/Producto');

// Puedes cargar dotenv si manejas variables de entorno
// require('dotenv').config();

const productosVeterinarios = [
  {
    nombre: "Antipulgas firulaias",
    precio: 59.90,
    descripcion: "Tratamiento mensual para perros",
    imagen: "antipulgas-perros.jpg",
    tipoMascota: "PERRO",
    categoria: new mongoose.Types.ObjectId(), // Coloca un ID válido existente si tienes categorías reales
  },
  {
    nombre: "Arena Sanitaria",
    precio: 32.50,
    descripcion: "Arena aglomerante para gatos",
    imagen: "arena-gatos.jpg",
    tipoMascota: "GATO",
    categoria: new mongoose.Types.ObjectId(),
  },
  {
    nombre: "Shampoo Medicado Canino",
    precio: 45.00,
    descripcion: "Shampoo hipoalergénico para tratamiento de piel sensible en perros",
    imagen: "shampoo-canino.jpg",
    tipoMascota: "PERRO",
    categoria: new mongoose.Types.ObjectId(),
  },
  {
    nombre: "Comida Seca Tom Adulto",
    precio: 78.90,
    descripcion: "Alimento balanceado para gatos adultos sabor carne",
    imagen: "comida-gatos.jpg",
    tipoMascota: "GATO",
    categoria: new mongoose.Types.ObjectId(),
  },
];

const cargarProductos = async () => {
  try {
    // Puedes usar process.env.MONGODB_URI si usas dotenv
    await mongoose.connect('mongodb://localhost:27017/veterinaria', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('->Conectado a MongoDB<-');

    // Limpia la colección antes de insertar
    await Producto.deleteMany();
    console.log('Colección "productos" limpiada');

    // Inserta los nuevos productos
    await Producto.insertMany(productosVeterinarios);
    console.log('Productos agregados exitosamente');
  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB...');
  }
};

cargarProductos();
