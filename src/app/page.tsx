"use client";
import Input from "@/components/input";
import Results from "@/components/results";

export default function Home() {
  return (
    <main className="">
      <div className="w-max w-[300px] mx-auto">
        <p className="mt-[30px] pb-[5px] text-[24px] text-center">
          Auto Complete
        </p>
        <p className="text-center">Search Gracefully</p>

        <div>
          <Input value={""} onChange={() => {}} />
          <Results />
        </div>
      </div>
    </main>
  );
}
