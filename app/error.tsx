"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Error() {
  return (
    <div className="flex flex-col items-center gap-2 mt-16 mb-8">
      <ExclamationTriangleIcon className="h-16 w-16" />
      <p className="text-4xl">Error Accured</p>
    </div>
  );
}
