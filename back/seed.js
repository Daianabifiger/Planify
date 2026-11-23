require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');
const Tablero = require('./models/Tablero');
const Columna = require('./models/Columna');
const Tarea = require('./models/Tarea');

const cargarDatosIniciales = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB para cargar datos iniciales...');

        // Limpiamos datos previos para evitar duplicados al correr el seed
        await Usuario.deleteMany({});
        await Tablero.deleteMany({});
        await Columna.deleteMany({});
        await Tarea.deleteMany({});

        // 1. Crear el usuario único
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash('admin1234', salt);

        await Usuario.create({
            email: 'admin@planify.com',
            password: passwordHasheada
        });

        // 2. Crear Tableros de Planificación de Eventos con imagen predeterminada en 'color'
        const tableroCasamiento = await Tablero.create({
            nombre: 'Casamiento Sofía & Lucas',
            color: 'casamiento.jpg'
        });

        const tableroCumple = await Tablero.create({
            nombre: 'Cumpleaños de 15 - Valentina',
            color: 'cumpleanos.jpg'
        });

        const tableroEgreso = await Tablero.create({
            nombre: 'Fiesta de Egresados 5to Año',
            color: 'egreso.jpg'
        });

        // 3. Crear las 4 Columnas del MVP para el Casamiento
        const colPorConfirmar = await Columna.create({
            tablero: tableroCasamiento._id,
            nombre: 'Por confirmar',
            orden: 1
        });
        const colEnGestion = await Columna.create({
            tablero: tableroCasamiento._id,
            nombre: 'En gestión',
            orden: 2
        });
        const colConfirmado = await Columna.create({
            tablero: tableroCasamiento._id,
            nombre: 'Confirmado',
            orden: 3
        });
        await Columna.create({
            tablero: tableroCasamiento._id,
            nombre: 'Listo',
            orden: 4
        });

        // Columnas para el Cumpleaños
        const colCumple1 = await Columna.create({
            tablero: tableroCumple._id,
            nombre: 'Por confirmar',
            orden: 1
        });
        await Columna.create({
            tablero: tableroCumple._id,
            nombre: 'En gestión',
            orden: 2
        });

        // Columnas para el Egreso
        const colEgreso1 = await Columna.create({
            tablero: tableroEgreso._id,
            nombre: 'Por confirmar',
            orden: 1
        });
        const colEgreso2 = await Columna.create({
            tablero: tableroEgreso._id,
            nombre: 'En gestión',
            orden: 2
        });
        await Columna.create({
            tablero: tableroEgreso._id,
            nombre: 'Confirmado',
            orden: 3
        });

        // 4. Crear Tareas con fechas límite reales para probar los indicadores
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);
        const ayer = new Date(hoy);
        ayer.setDate(hoy.getDate() - 1);
        const proximaSemana = new Date(hoy);
        proximaSemana.setDate(hoy.getDate() + 7);

        await Tarea.insertMany([
            {
                columna: colPorConfirmar._id,
                titulo: 'Definir menú vegetariano y sin TACC',
                descripcion: 'Confirmar cantidad exacta de platos especiales con el servicio de catering.',
                etiqueta: 'Catering',
                prioridad: 'alta',
                fechaLimite: hoy,
                orden: 1
            },
            {
                columna: colEnGestion._id,
                titulo: 'Visita técnica a Estancia Los Robles',
                descripcion: 'Revisar iluminación del salón principal y plan B por lluvia.',
                etiqueta: 'Locaciones',
                prioridad: 'alta',
                fechaLimite: manana,
                orden: 1
            },
            {
                columna: colEnGestion._id,
                titulo: 'Cerrar lista final de mesa principal',
                descripcion: 'Falta confirmar asistencia de 4 familiares del interior.',
                etiqueta: 'Invitados',
                prioridad: 'media',
                fechaLimite: ayer,
                orden: 2
            },
            {
                columna: colConfirmado._id,
                titulo: 'Seña DJ y sonido principal',
                descripcion: 'Contrato firmado y transferencia del 50% enviada.',
                etiqueta: 'Proveedores',
                prioridad: 'baja',
                fechaLimite: proximaSemana,
                orden: 1
            },
            {
                columna: colCumple1._id,
                titulo: 'Pedir presupuesto de barra de tragos',
                descripcion: 'Consultar opciones sin alcohol para adolescentes.',
                etiqueta: 'Catering',
                prioridad: 'media',
                fechaLimite: proximaSemana,
                orden: 1
            },
            {
                columna: colEgreso1._id,
                titulo: 'Reservar salón y pista LED para egresados',
                descripcion: 'Comparar capacidad para 250 invitados entre alumnos y familias.',
                etiqueta: 'Locaciones',
                prioridad: 'alta',
                fechaLimite: manana,
                orden: 1
            },
            {
                columna: colEgreso2._id,
                titulo: 'Confirmar tanda de entradas por alumno',
                descripcion: 'Recopilar listado de acompañantes extra por cada egresado.',
                etiqueta: 'Invitados',
                prioridad: 'media',
                fechaLimite: proximaSemana,
                orden: 1
            }
        ]);

        console.log('✅ Datos iniciales cargados con éxito');
        console.log('👉 Usuario: admin@planify.com | Contraseña: admin1234');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al cargar datos iniciales:', error.message);
        process.exit(1);
    }
};

cargarDatosIniciales();