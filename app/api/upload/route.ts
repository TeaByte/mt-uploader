import { saveFile } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bytesToSize from "@/lib/size";
import { APIResponse } from "@/types";
import * as em from "./messages";

const MAX_SIZE = 1998796928; // 1.9GB;
const FREE_SIZE = 20971520; // 19MB;

function returnError(message: any) {
  return NextResponse.json(message, {
    status: 403,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) return returnError(em.errorOnFileNotFound);

  try {
    const formData = new FormData();
    formData.append("file", file);

    if (file.size > MAX_SIZE) return returnError(em.errorOnPaid);

    const response = await fetch(
      `${process.env.PYTHON_MTPROTO_API_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData: APIResponse = await response.json();
      try {
        const prismaData = await saveFile(
          file.name,
          bytesToSize(file.size),
          responseData.mime_type,
          responseData.file_id
        );

        return NextResponse.json({ success: true, id: prismaData.id });
      } catch {
        return returnError(em.errorOnDB);
      }
    } else return returnError(em.errorOnUpload);
  } catch (error) {
    return returnError(em.errorOnFailure);
  }
}
