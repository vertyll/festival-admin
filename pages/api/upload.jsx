import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "node:fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: process.env.S3_REGION || "us-east-1",
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];
  const bucketName = process.env.S3_BUCKET;

  for (const file of files.file) {
    const fileExtension = file.originalFilename.split(".").pop();
    const newFilename = `${Date.now()}.${fileExtension}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );

    const link = `${process.env.S3_ENDPOINT}/${bucketName}/${newFilename}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
