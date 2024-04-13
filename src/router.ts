import { Router } from "express";
import { ancestryResource, versatileHeritageResource, traitResource } from "./user-interface";
import { actionResource } from "./user-interface/api/action-resource";
import { featResource } from "./user-interface/api/feat-resource";

const router: Router = Router()

router.get("/traits", traitResource.import);
router.get("/actions", actionResource.import);
router.get("/feats", featResource.import);
router.get("/versatile-heritages", versatileHeritageResource.import);
router.get("/ancestries", ancestryResource.import);

export { router };