import { Request, Response } from 'express';
import { importVersatileHeritages } from '../../application/usecase';

class VersatileHeritageResource {

    public import = async (req: Request, res: Response) => {
        const response = await importVersatileHeritages();
        res.json(response);
    }

}

export const versatileHeritageResource = new VersatileHeritageResource();