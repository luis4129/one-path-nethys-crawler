import { Request, Response } from 'express';
import { importTraits } from '../../application/usecase';

class TraitResource {

    public import = async (req: Request, res: Response) => {
        const response = await importTraits();
        res.json(response);
    }

}

export const traitResource = new TraitResource();