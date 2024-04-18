declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PRIVATE_KEY?: string;
            PORT?: string;
            DATABASE_URL?: string;
        }
    }
}

export { }