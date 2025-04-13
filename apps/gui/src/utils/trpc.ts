import type { AppRouter } from "@repo/api/routers/index";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import {
    createTRPCReact,
    type inferReactQueryProcedureOptions,
} from "@trpc/react-query";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const trpc = createTRPCReact<AppRouter>();
export default trpc;
