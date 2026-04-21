import IORedis from "ioredis";

export const createRedisConnection = (url: string) => {
    return new IORedis(url, {
        maxRetriesPerRequest: null,
    });
};