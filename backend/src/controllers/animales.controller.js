const AnimalesModel = require('../models/animales');
const mongoose = require('mongoose')

class AnimalesController {

    async agregar(req, res) {
        try {
            const body = req.body;

            //Validamos que esten completos los campos
            if (!body.nombre || !body.nombre_cientifico || !body.habitat || !body.peligro_extincion || !body.tipo_animal) {
                return res.status(400).json({
                    ok: false, mensaje: 'Debes completar todos los campos solicitados'
                })
            }

            //validamos que no exista otro animal con el mismo nombre
            const existeAnimal = await AnimalesModel.findOne({
                nombre: body.nombre, nombre_cientifico: body.nombre_cientifico
            })

            if (existeAnimal) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un animal con ese nombre y nombre científico',
                })
            }

            // Creamos el nuevo Animal
            const nuevoAnimal = {
                nombre: body.nombre, nombre_cientifico: body.nombre_cientifico, habitat: body.habitat, peligro_extincion: body.peligro_extincion, tipo_animal: body.tipo_animal
            }

            const animalCreado = await AnimalesModel.create(
                nuevoAnimal
            )

            if (!animalCreado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Hubo un error al crear el nuevo Animal',
                })
            }
            res.status(200).json({
                ok: true,
                Animal: animalCreado,
            })

        } catch (error) {
            console.error('Error al crear el nuevo Animal:', error)
            return res.status(500).json({
                ok: false,
                mensaje: 'Hubo un error al crear el nuevo Animal',
            })
        }
    }

    async mostrar(req, res) {
        try {
            const totalAnimales = await AnimalesModel.find().select(
                '_id nombre nombre_cientifico habitat peligro_extincion tipo_animal'
            )
            return res.status(200).json({
                ok: true,
                totalAnimales
            })
        } catch (error) {
            console.error('Error al mostrar los Animales:', error)
            return res.status(500).json({
                ok: false,
                mensaje: 'Hubo un error al mostrar los Animales',
            })
        }
    }

    async eliminar(req, res) {
        try {
            const { animalId } = req.params;

            //validacion del ID para que sea como el ID de Mongoose
            if (!mongoose.isValidObjectId(animalId)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'ID no válido',
                })
            }

            // Eliminamos el Animal seleccionado
            const animalEliminado = await AnimalesModel.findByIdAndDelete(animalId)
            if (!animalEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Animal',
                })
            }

            res.status(200).json({
                ok: true,
                animalEliminado,
                mensaje: 'Animal eliminado',
            })
        } catch (error) {
            console.error('Error al mostrar los Animales:', error)
            return res.status(500).json({
                ok: false,
                mensaje: 'Hubo un error al mostrar los Animales',
            })
        }
    }
}

const animalesController = new AnimalesController();
module.exports = animalesController;