import apicache from "apicache";

class ApiCache {
    private cache: any;

    constructor() {
        this.cache = apicache.middleware;
    }

    public getCache(duration: string) {
        return this.cache(duration);
    }

    public clearCache(key: string) {
        apicache.clear(key);
    }

}

const apiCacheInstance = new ApiCache();

export default apiCacheInstance;
