// Import the MemoryCache class from the specified file
import { MemoryCache } from './MemoryCache'; // Adjust the path as needed

// Define a generic Controller class that works with any type T
export class Controller<T> {
    private apiUrl: string; // URL for the API endpoint
    private cache: MemoryCache<T[]>; // Cache instance to store fetched results
    private debounceDuration: number; // Duration to wait before calling the function
    private minQueryLength: number; // Minimum length of query string to make a request
    private lastQuery: string; // Last query string to prevent stale results
    private debouncedFetch: (query: string, limit?: number) => Promise<T[]>; // Debounced function to fetch results

    // Constructor to initialize the Controller instance
    constructor(
        apiUrl: string, // API URL to fetch data from
        cache: MemoryCache<T[]>, // Cache to store fetched results
        debounceDuration: number = 300, // Optional: duration to debounce function calls
        minQueryLength: number = 3 // Optional: minimum query length to trigger search
    ) {
        this.apiUrl = apiUrl; // Set the API URL
        this.cache = cache; // Set the cache instance
        this.debounceDuration = debounceDuration; // Set debounce duration
        this.minQueryLength = minQueryLength; // Set minimum query length
        this.lastQuery = ''; // Initialize last query as an empty string
        // Initialize the debouncedFetch function with the debounced fetchResults method
        this.debouncedFetch = this.debounce(this.fetchResults.bind(this), debounceDuration);
    }

    // Define a debounce function to limit the rate of function calls
    private debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
        let timeout: NodeJS.Timeout | undefined; // Variable to keep track of the timeout ID
        return function(...args: Parameters<T>) {
            if (timeout) {
                clearTimeout(timeout); // Clear the existing timeout if it exists
            }
            // Set a new timeout to call the function after the specified delay
            timeout = setTimeout(() => fn(...args), delay);
        } as T; // Cast the returned function to match the type of the original function
    }

    // Define an asynchronous method to fetch results from the API
    private async fetchResults(query: string, limit: number = 10): Promise<T[]> {
        if (query.length < this.minQueryLength) {
            return []; // Return an empty array if the query length is less than the minimum
        }

        // Check if the results are already cached
        const cachedResults = this.cache.get(query);
        if (cachedResults) {
            return cachedResults; // Return cached results if available
        }

        // If results are not cached, fetch them from the server
        try {
            const response = await fetch(`${this.apiUrl}?query=${query}&limit=${limit}`);
            const results: T[] = await response.json(); // Parse the JSON response

            // Store the fetched results in the cache
            this.cache.set(query, results);

            return results; // Return the fetched results
        } catch (error) {
            console.error("Error fetching results:", error); // Log any errors
            return []; // Return an empty array in case of error
        }
    }

    // Define a public method to handle input changes and update the UI
    public handleInputChange(query: string, updateResultsUI: (results: T[]) => void): void {
        this.lastQuery = query; // Update the last query
        this.debouncedFetch(query).then(results => {
            if (query === this.lastQuery) { // Ensure the results are for the latest query
                updateResultsUI(results); // Update the UI with the results
            }
        });
    }
}
