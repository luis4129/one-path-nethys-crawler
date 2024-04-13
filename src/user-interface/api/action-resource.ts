import { Request, Response } from 'express';
import { importActions } from '../../application/usecase/import-actions';

class ActionResource {

    public import = async (req: Request, res: Response) => {
        const response = await importActions();
        res.json(response);
    }

}

export const actionResource = new ActionResource();