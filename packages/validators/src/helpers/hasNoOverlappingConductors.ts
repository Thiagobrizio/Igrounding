export default function hasNoOverlappingConductors(
    conductors: { x: number; y: number }[]
): boolean {
    const uniqueConductors = conductors.filter((conductor, index) => {
        return (
            conductors.findIndex(
                (needle) => conductor.x === needle.x && conductor.y === needle.y
            ) === index
        );
    });

    return uniqueConductors.length === conductors.length;
}
