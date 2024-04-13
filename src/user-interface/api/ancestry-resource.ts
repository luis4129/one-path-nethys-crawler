import { Request, Response } from 'express';
import { importAncestries } from '../../application/usecase';

class AncestryResource {

    public import = async (req: Request, res: Response) => {
        const response = await importAncestries();
        res.json(response);
    }

}

export const ancestryResource = new AncestryResource();