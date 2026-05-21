import z from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().nonempty(),
}).required();

// In Next.js client bundles, NEXT_PUBLIC vars are replaced on direct access.
// Parsing process.env as a whole can miss them and return undefined.
const rawEnv = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

const parsedEnv = envSchema.safeParse(rawEnv);

if(!parsedEnv.success) {
    console.error("Invalid environment variables:", z.treeifyError(parsedEnv.error));
    throw new Error("Invalid environment variables");
}

export const envs = {
    API_URL: parsedEnv.data.NEXT_PUBLIC_API_URL,
    GOOGLE_CLIENT_ID: parsedEnv.data.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
}