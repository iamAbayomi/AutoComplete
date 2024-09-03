// Import the MemoryCache class from the specified file
import { MemoryCache } from './MemoryCache'; // Adjust the path as needed

// Define a generic Controller class that works with any type T
export class Controller<T> {
    private apiUrl: string;
    private cache: MemoryCache<T[]>;
    private debounceDuration: number;
    private minQueryLength: number;
    private lastQuery: string;
    private debouncedFetch: (query: string, limit?: number) => Promise<T[]>;

    constructor(
        apiUrl: string,
        cache: MemoryCache<T[]>,
        debounceDuration: number = 300,
        minQueryLength: number = 3
    ) {
        this.apiUrl = apiUrl;
        this.cache = cache;
        this.debounceDuration = debounceDuration;
        this.minQueryLength = minQueryLength;
        this.lastQuery = '';
        this.debouncedFetch = this.debounce(this.fetchResults.bind(this), debounceDuration);
    }

    private debounce(fn: (query: string, limit?: number) => Promise<T[]>, delay: number) {
        let timeout: NodeJS.Timeout | undefined;
        return (query: string, limit: number = 10): Promise<T[]> => {
            return new Promise((resolve) => {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    fn(query, limit).then(resolve);
                }, delay);
            });
        };
    }

    private async fetchResults(query: string, limit: number = 10): Promise<T[]> {
        if (query.length < this.minQueryLength) {
            return [];
        }

        // Check cache first
        const cachedResults = this.cache.get(query);
        if (cachedResults) {
            return cachedResults;
        }

        // Fetch from server
        try {
            const response = await fetch(`${this.apiUrl}?query=${query}&limit=${limit}`);
            const results: T[] = await response.json();

            // Store results in cache
            this.cache.set(query, results);

            console.log("Fetched results:", results);

            return results;
        } catch (error) {
            console.error("Error fetching results:", error);
            return [];
        }
    }

    public handleInputChange(query: string, updateResultsUI: (results: T[]) => void): void {
        this.lastQuery = query; // Update the last query
        this.debouncedFetch(query).then(results => {
            if (query === this.lastQuery) { // Ensure the results are for the latest query
                updateResultsUI(results); // Update the UI with the results
            }
        }).catch(error => {
            console.error("Error in debouncedFetch:", error);
        });
    }
}
