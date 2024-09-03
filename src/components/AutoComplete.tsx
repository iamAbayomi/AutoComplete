/**
 * Auto Complete component
 */
"use client";
import { useState } from "react";
import { MemoryCache } from "@/services/MemoryCache";
import { Controller } from "@/services/Controller";
import InputField from "@/components/InputField";
import ResultsUI from "@/components/ResultsUI";

type ResultType = string[];

interface AutoCompleteProps {
  numberOfResults?: number; // number of the results to show
  apiUrl: string; // API URL to fetch results from
  debounceDuration?: number; // debounce duration in milliseconds
  minQueryLength?: number; // minimum query length to trigger API call
  apiTimeoutDuration?: number; // API timeout duration in milliseconds
  cacheDuration?: number; // cache duration in milliseconds
}

export default function AutoComplete({
  numberOfResults,
  apiUrl,
  debounceDuration,
  minQueryLength,
  apiTimeoutDuration,
  cacheDuration
}: AutoCompleteProps) {
  const [results, setResults] = useState<ResultType[]>([]);
  const cache = new MemoryCache<ResultType[]>();
  // Initialize the controller with the API URL and cache
  const controller = new Controller<ResultType>(
    apiUrl,
    cache,
    debounceDuration,
    minQueryLength,
    numberOfResults
  );

  const updateResultsUI = (results: ResultType[]) => {
    setResults(results);
  };

  const handleSelection = (selectedResult: ResultType) => {
    setResults([selectedResult]);
    console.log("User selected:", selectedResult);
    // Handle further actions on selection
  };

  return (
    <div>
      <InputField controller={controller} updateResultsUI={updateResultsUI} />
      <ResultsUI results={results} handleSelection={handleSelection} />
    </div>
  );
}
