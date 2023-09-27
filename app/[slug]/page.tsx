import prisma from "@/lib/prisma";
import { type Props } from "@/types";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Download from "@/components/download";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GetFile(props: Props) {
  const file = await prisma.file.findUnique({
    where: { id: props.params.slug },
  });

  if (!file) {
    return (
      <div className="flex flex-col items-center gap-2 mt-16 mb-8">
        <ExclamationTriangleIcon className="h-16 w-16" />
        <p className="text-6xl">File Not Found</p>
      </div>
    );
  }

  return (
    <>
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            {file.name} <Badge>{file.size}</Badge>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Download id={file.id} />
        </CardFooter>
      </Card>
      <p></p>
    </>
  );
}
