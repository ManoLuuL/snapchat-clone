"use client";

import { ErrorProps } from "./types";

const Error = (props: ErrorProps) => {
  const { error, reset } = props;

  const handleError = () => reset();

  return (
    <main className="flex  flex-col items-center  justify-center">
      <h2 className="text-center">
        Something went wrong!
        {error.message}
      </h2>
      <button
        className="mt-4 rounded-md bg-sigSurface px-4 py-2 text-sm text-white transition-colors hover:bg-main"
        onClick={handleError}
      >
        Try again
      </button>
    </main>
  );
};

export default Error;
