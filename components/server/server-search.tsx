"use client";

import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
  // console.log(data);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-1 px-2 py-2
      w-full rounded-md  hover:bg-zinc-700/10 hover:dark:bg-zinc-700/50 transition group "
      >
        <Search className="h-4 w-4 text-zinc-500 group-hover:dark:text-zinc-300" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:dark:text-zinc-300 transition">
          Search
        </p>
        <kbd className="ml-auto pointer-events-none inline-flex items-center gap-1 bg-muted rounded border font-mono px-1.5 text-muted-foreground group-hover:text-muted-foreground/50">
          <span className="text-xs">
            {/* ⌘ */}
            &#8984;
            </span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {data.map(({ data, label, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, name, icon }) => {
                  return (
                    <CommandItem key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
