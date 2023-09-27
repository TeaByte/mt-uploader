"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Response } from "@/types";

import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import CardBox from "./card";
import FileInput from "./FileInput";

export default function Main() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recaptcha = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cards, setCards] = useState<{ name: string; id: string }[]>([]);

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setToken(token);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return setError("Please select a file to upload");

    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      data.set("captchaToken", token);

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
      recaptcha?.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:w-1/2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 text-foreground items-center"
      >
        <FileInput
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0])}
        />

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
        <div className="flex flex-col gap-2">
          {cards.map((card, index) => (
            <CardBox key={index} name={card.name} id={card.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
