// MemoryCache.ts

export class MemoryCache<T> {
    private cache: Map<string, { results: T; timestamp: number }>;
    private cacheDuration: number;

    constructor(cacheDuration: number = 300000) { // Cache duration is in milliseconds, default is 5 minutes
        this.cache = new Map();
        this.cacheDuration = cacheDuration;
    }

    get(query: string): T | null {
        const entry = this.cache.get(query);
        if (!entry) return null;

        const { results, timestamp } = entry;
        if (Date.now() - timestamp > this.cacheDuration) {
            this.cache.delete(query);
            return null;
        }
        return results;
    }

    set(query: string, results: T): void {
        this.cache.set(query, {
            results,
            timestamp: Date.now()
        });
    }

    clear(): void {
        this.cache.clear();
    }
}
