"use client";
import { useState } from "react";
import { MemoryCache } from "@/services/MemoryCache";
import { Controller } from "@/services/Controller";
import InputField from "@/components/InputField";
import ResultsUI from "@/components/ResultsUI";

type ResultType = string[];

export default function Home() {
  const [results, setResults] = useState<ResultType[]>([]);
  const cache = new MemoryCache<ResultType[]>();
  // Initialize the controller with the API URL and cache
  const controller = new Controller<ResultType>(
    "http://127.0.0.1:5000/search",
    cache
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
    <main className="">
      <div className="w-max w-[300px] mx-auto">
        <p className="mt-[30px] pb-[5px] text-[24px] text-center">
          Auto Complete
        </p>
        <p className="text-center">Search Gracefully</p>

        <div>
          <InputField
            controller={controller}
            updateResultsUI={updateResultsUI}
          />
          <ResultsUI results={results} handleSelection={handleSelection} />
        </div>
      </div>
    </main>
  );
}
