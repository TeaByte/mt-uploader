"use client";

import { ComponentPropsWithRef } from "react";

export default function FileInput(props: ComponentPropsWithRef<"input">) {
  return (
    <input
      {...props}
      className={
        "file:text-foreground hover:file:bg-violet-100" +
        "file:px-4 file:py-2 file:mr-2 file:border-none file:rounded-xl" +
        "hover:cursor-pointer border rounded-xl text-gray-400 w-full"
      }
      type="file"
    />
  );
}
