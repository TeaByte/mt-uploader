"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { ReloadIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function Download({ id }: { id: string }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState("");

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setToken(token);
    }
  };

  const onDonwload = async () => {
    try {
      setUploading(true);
      const response = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ id, token }),
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
      recaptcha?.current?.reset();
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <ReCAPTCHA
        size="normal"
        sitekey="6LcpMFooAAAAAKIxzEockoR_2qNLevhf8sOuHqCS"
        onChange={onCaptchaChange}
        ref={recaptcha}
        className="relative"
        style={{ transform: "scale(0.90)" }}
        theme="light"
      />
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
