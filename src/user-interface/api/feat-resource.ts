import { Request, Response } from 'express';
import { importFeats } from '../../application/usecase/import-feats';

class FeatResource {

    public import = async (req: Request, res: Response) => {
        const response = await importFeats();
        res.json(response);
    }

}

export const featResource = new FeatResource();