import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Denuncia from '../models/Denuncia';
import User from '../models/User';

const createDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const { descripcion, fecha, idUser, gravedad, titulo } = req.body;

    const denuncia = new Denuncia({
        _id: new mongoose.Types.ObjectId(),
        titulo,
        descripcion,
        fecha,
        idUser,
        gravedad
    });

    User.findByIdAndUpdate(idUser, { $push: { denuncias: denuncia._id } }, { new: true })
        .then((updatedUser) => {
            console.log('Usuario actualizado:', updatedUser);
        })
        .catch((error) => {
            console.error('Error al actualizar usuario:', error);
        });

    return denuncia
        .save()
        .then((denuncia) => res.status(201).json(denuncia))
        .catch((error) => res.status(500).json({ error }));
};

const readDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return (
        Denuncia.findById(denunciaId)
            //.populate('createdEventsId', 'joinedEventsId', 'idCategories')
            .then((denuncia) => (denuncia ? res.status(200).json(denuncia) : res.status(404).json({ message: 'not found' })))
            .catch((error) => res.status(500).json({ error }))
    );
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return (
        Denuncia.find()
            //.populate('createdEventsId', 'joinedEventsId', 'idCategories')
            .then((denuncias) => res.status(200).json(denuncias))
            .catch((error) => res.status(500).json({ error }))
    );
};

const updateDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findById(denunciaId)
        .then((denuncia) => {
            if (denuncia) {
                denuncia.set(req.body);

                return denuncia
                    .save()
                    .then((denuncia) => res.status(201).json(denuncia))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteDenuncia = (req: Request, res: Response, next: NextFunction) => {
    const denunciaId = req.params.denunciaId;

    return Denuncia.findByIdAndDelete(denunciaId)
        .then((denuncia) => (denuncia ? res.status(201).json({ denuncia, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createDenuncia, readDenuncia, readAll, updateDenuncia, deleteDenuncia };
