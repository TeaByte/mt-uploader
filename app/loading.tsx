import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-2 mt-16 mb-8">
      <ReloadIcon className="h-16 w-16 animate-spin" />
      <p className="text-4xl">Loading Content...</p>
    </div>
  );
}
