import React from "react";

// Define the types for the props
interface ResultsUIProps<T> {
  results: any;
  handleSelection: (result: T) => void;
}

// Constrain T to be renderable by React (ReactNode)
export default function ResultsUI<T extends React.ReactNode>({
  results,
  handleSelection
}: ResultsUIProps<T>): JSX.Element {
  return (
    <div>
      <ul>
        {results?.results?.map((result: any, index: React.Key | null | undefined) => (
          <li
            key={index}
            onClick={() => handleSelection(result)}
            style={{ cursor: "pointer" }}
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}
