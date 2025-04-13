import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui/table";

import trpc from "~/utils/trpc";

export default function WorstCaseTable() {
    const { data, isLoading, isError } = trpc.solution.getWorstCase.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error</div>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Current (A)</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.sourceCurrents.map((source) => (
                    <TableRow key={source.id}>
                        <TableCell>{source.name}</TableCell>
                        <TableCell>
                            {source.current.current.toFixed(2)} A
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))}
                {data.towerCurrents.map((tower) => (
                    <TableRow key={tower.id}>
                        <TableCell>{tower.name}</TableCell>
                        <TableCell>
                            {tower.current.current.toFixed(2)} A
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
