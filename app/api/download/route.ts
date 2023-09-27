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
  let { id, token } = data;

  if (!id) return returnError(em.errorOnIDNotFound);
  if (!token) return returnError(em.errorOnCaptchaVerification);

  const captchaVerificationResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  );
  const captchaVerificationData = await captchaVerificationResponse.json();
  if (!captchaVerificationData.success) {
    return returnError(em.errorOnCaptchaVerification);
  }

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
    console.log(error);
    return returnError(em.errorOnFailure);
  }
}
