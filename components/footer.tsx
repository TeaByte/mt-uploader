import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Toggle from "@/components/theme/toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="w-full md:w-1/2 gap-1 mt-8">
      <Separator />
      <div className="flex justify-between items-center p-2">
        <a href="https://github.com/teabyte/" target="_blank">
          <p className="hover:underline">Made With 💛 By @TeaByte</p>
        </a>
        <div className="flex justify-center gap-2">
          <a href="https://github.com/teabyte/mt-uploader/" target="_blank">
            <Button
              variant={"outline"}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
          </a>
          <Toggle />
        </div>
      </div>
    </footer>
  );
}
