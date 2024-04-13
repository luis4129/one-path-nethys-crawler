import { heritageRepository } from "../../infrastructure/mongodb/heritage-repository";
import { Heritage } from "../domain/documents";

export async function findVersatileHeritages(): Promise<Array<Heritage>> {
    return await heritageRepository.findAll();
}



