import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IDenuncia {
    titulo: string;
    descripcion: string;
    fecha: Date;
    idUser: IUser;
    gravedad: number;
}

export interface IDenunciaModel extends IDenuncia, Document {}

const DenunciaSchema: Schema = new Schema(
    {
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        fecha: { type: Date, required: true },
        gravedad: { type: Number, required: true },
        idUser: { type: Schema.Types.ObjectId, required: false, ref: 'User' }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IDenunciaModel>('Denuncia', DenunciaSchema);
