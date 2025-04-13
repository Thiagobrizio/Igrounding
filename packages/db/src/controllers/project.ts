import type { LibraryDatabase, ProjectDatabase } from "..";

import { aliasedTable, eq, getTableColumns } from "../drizzle";
import getUniqueIds from "../helpers/getUniqueIds";
import { conductorLocations as conductorLocationsTable } from "../library/conductorLocations";
import { conductorTypes as conductorTypesTable } from "../library/conductorTypes";
import { towerGeometries as towerGeometriesTable } from "../library/towerGeometries";
import { sources as sourcesTable } from "../project/sources";
import { transmissionConductors as transmissionConductorsTable } from "../project/transmissionConductors";
import { transmissionLines as transmissionLinesTable } from "../project/transmissionLines";
import { transmissionTowers as transmissionTowersTable } from "../project/transmissionTowers";

const fromSource = aliasedTable(sourcesTable, "fromSource");
const toSource = aliasedTable(sourcesTable, "toSource");
const columns = getTableColumns(transmissionLinesTable);

export async function getProject(
    projectDb: ProjectDatabase,
    libraryDb: LibraryDatabase
) {
    const sources = await projectDb.select().from(sourcesTable);
    const tlines = await projectDb
        .select({
            ...columns,
            fromSource: fromSource,
            toSource: toSource,
        })
        .from(transmissionLinesTable)
        .innerJoin(
            fromSource,
            eq(transmissionLinesTable.fromSourceId, fromSource.id)
        )
        .innerJoin(
            toSource,
            eq(transmissionLinesTable.toSourceId, toSource.id)
        );

    const transmissionLines = [];
    for await (const tline of tlines) {
        const conductorsDb = await projectDb
            .select()
            .from(transmissionConductorsTable)
            .where(eq(transmissionConductorsTable.lineId, tline.id));
        const conductors = [];
        for await (const conductor of conductorsDb) {
            const [type] = await libraryDb
                .select()
                .from(conductorTypesTable)
                .where(eq(conductorTypesTable.id, conductor.typeId));
            if (!type) {
                throw Error("Can't find Conductor Type");
            }
            conductors.push({ ...conductor, type });
        }
        const towersDb = await projectDb
            .select()
            .from(transmissionTowersTable)
            .where(eq(transmissionTowersTable.lineId, tline.id));

        const towers = [];
        for await (const tower of towersDb) {
            const [geometry] = await libraryDb
                .select()
                .from(towerGeometriesTable)
                .where(eq(towerGeometriesTable.id, tower.geometryId));
            if (!geometry) {
                throw Error("Can't find Tower Geometry");
            }
            towers.push({ ...tower, geometry });
        }

        transmissionLines.push({
            ...tline,
            conductors,
            towers,
        });
    }

    const towerGeometries = [];
    const allGeometriesUsed = transmissionLines
        .map((line) => line.towers.map((tower) => tower.geometryId))
        .flat();
    const uniqueGeometryIds = getUniqueIds(allGeometriesUsed);
    for await (const geometryId of uniqueGeometryIds) {
        const [towerGeometry] = await libraryDb
            .select()
            .from(towerGeometriesTable)
            .where(eq(towerGeometriesTable.id, geometryId))
            .execute();
        if (!towerGeometry) {
            throw Error("Can't find Tower Geometry");
        }
        const conductors = await libraryDb
            .select()
            .from(conductorLocationsTable)
            .where(eq(conductorLocationsTable.geometryId, towerGeometry.id))
            .execute();
        towerGeometries.push({
            ...towerGeometry,
            conductors,
        });
    }

    const conductorTypes = [];
    const allConductorTypeIds = transmissionLines
        .map((line) => line.conductors.map((conductor) => conductor.typeId))
        .flat();
    const uniqueConductorTypeIds = getUniqueIds(allConductorTypeIds);
    for await (const conductorTypeId of uniqueConductorTypeIds) {
        const [conductorType] = await libraryDb
            .select()
            .from(conductorTypesTable)
            .where(eq(conductorTypesTable.id, conductorTypeId))
            .execute();
        if (!conductorType) {
            throw Error("Can't find Conductor Type");
        }
        conductorTypes.push(conductorType);
    }

    return { sources, transmissionLines, towerGeometries, conductorTypes };
}

export type Project = Awaited<ReturnType<typeof getProject>>;
