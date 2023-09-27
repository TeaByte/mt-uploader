"use client";

import { useState } from "react";

import { ClipboardCopyIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CardBox({ name, id }: { name: string; id: string }) {
  const [text, setText] = useState("Copy URL");
  const url = `https://mt-uploader.vercel.app/${id}`;

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setText("Copied!");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <Input type="text" value={url} readOnly />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between" onClick={handleCopy}>
        <Button variant="outline" className="flex gap-1">
          <ClipboardCopyIcon />
          {text}
        </Button>
        <a href={`/${id}`} target="_blank">
          <Button className="flex gap-1">
            <OpenInNewWindowIcon />
            Open Page
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
