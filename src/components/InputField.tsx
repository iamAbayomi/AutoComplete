import React, { useState } from "react";
import { Controller } from "@/services/Controller";

interface props<T> {
  controller: Controller<T>;
  updateResultsUI: (results: T[]) => void;
}

export default function InputField<T>({
  controller,
  updateResultsUI
}: props<T>) {
  const [query, setQuery] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);
    controller.handleInputChange(userInput, updateResultsUI);
  };
  return (
    <input
      type="text"
      className="w-full p-[10px] mt-[20px] border-[1px] border-solid border-gray-300 rounded-[5px]"
      placeholder="Search"
      value={query}
      onChange={handleInput}
    />
  );
}
