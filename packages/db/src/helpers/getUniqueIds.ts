export default function getUniqueIds(ids: string[]) {
    return [...new Set(ids)];
}
