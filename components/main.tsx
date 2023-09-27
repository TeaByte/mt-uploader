"use client";

import { useState, useRef } from "react";
import { Response } from "@/types";

import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import CardBox from "./card";

export default function Main() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cards, setCards] = useState<{ name: string; id: string }[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return setError("Please select a file to upload");

    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const responseData: Response = await response.json();
      const id = responseData.id;

      if (!response.ok) {
        return setError((responseData as any).error);
      }

      if (!id) {
        return setError("Something went wrong");
      }

      setCards((cards) => [...cards, { name: file.name, id }]);
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(undefined);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:w-1/2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 text-foreground items-center"
      >
        <input
          ref={fileInputRef}
          className="rounded-xl border bg-card text-card-foreground shadow text-sm block w-full p-3"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        {uploading ? (
          <Button disabled className="flex gap-1 w-full">
            Uploading
            <ReloadIcon className="h-5 w-5 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full flex gap-1">
            Upload
            <UploadIcon className="h-5 w-5" />
          </Button>
        )}
        <p>{error && <p className="text-red-500">{error}</p>}</p>
      </form>
      <section className="flex flex-col gap-1">
        {cards.length > 0 && <p>Uploaded files ({cards.length})</p>}
        {cards.map((card, index) => (
          <CardBox key={index} name={card.name} id={card.id} />
        ))}
      </section>
    </div>
  );
}
