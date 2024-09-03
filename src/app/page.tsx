"use client";
import { useState } from "react";
import { MemoryCache } from "@/services/MemoryCache";
import { Controller } from "@/services/Controller";
import InputField from "@/components/InputField";
import ResultsUI from "@/components/ResultsUI";
import AutoComplete from "@/components/AutoComplete";

type ResultType = string[];

export default function Home() {
  return (
    <main className="">
      <div className="w-max w-[380px] mx-auto">
        <p className="mt-[30px] pb-[5px] text-[24px] text-center">
          Auto Complete
        </p>
        <p className="text-center">Search Gracefully</p>

        <AutoComplete apiUrl="http://127.0.0.1:5000/search" />
      </div>
    </main>
  );
}
