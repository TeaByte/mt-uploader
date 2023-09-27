import { getFile } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as em from "./messages";

function returnError(message: any) {
  return NextResponse.json(message, {
    status: 403,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  let { id } = data;

  if (!id) return returnError(em.errorOnIDNotFound);

  try {
    const response = await fetch(
      `${process.env.PYTHON_MTPROTO_API_URL}/get?file_id=${id}`
    );
    if (response.ok) {
      const responseData = await response.arrayBuffer();

      try {
        const prismaData = await getFile(id);
        if (!prismaData) return returnError(em.errorOnIDNotFound);
        return new NextResponse(responseData, {
          status: 200,
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${prismaData.name}"`,
          },
        });
      } catch {
        return returnError(em.errorOnDB);
      }
    } else return returnError(em.errorOnDownload);
  } catch (error) {
    return returnError(em.errorOnFailure);
  }
}
