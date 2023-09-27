"use client";

import { useState } from "react";

import { ReloadIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function Download({ id }: { id: string }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDonwload = async () => {
    try {
      setUploading(true);
      const response = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        return setError("Something went wrong");
      }

      let fileName = "unknown.txt";
      const contentDispositionHeader = response.headers.get(
        "Content-Disposition"
      );
      if (contentDispositionHeader) {
        const fileNameMatch = contentDispositionHeader.match(/filename="(.+)"/);
        if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setError("");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {uploading ? (
        <Button disabled className="flex gap-1 w-full">
          Downloading
          <ReloadIcon className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={onDonwload}
          className="w-full flex gap-1"
        >
          Download
          <DownloadIcon className="h-5 w-5" />
        </Button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
