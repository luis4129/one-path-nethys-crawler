import feats from "../file/feats.json";

export default function fetchFeatIds(): Array<string> {
    return feats.map(feat => feat.url.split("?ID=")[1]);
}