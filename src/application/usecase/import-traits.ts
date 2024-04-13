import { ImportResponse } from "../domain/dto";
import { traitRepository } from "../../infrastructure/mongodb/trait-repository";
import fetchTraits from "../../infrastructure/nethys/trait";
import fetchTraitIds from "../../infrastructure/nethys/trait/fetch-trait-ids";

export async function importTraits(): Promise<ImportResponse> {
    const ids = await fetchTraitIds();
    const traits = await fetchTraits(ids);

    await traitRepository.delete()
    const { acknowledged, insertedCount } = await traitRepository.save(traits);

    return { acknowledged, insertedCount, data: traits };
}



