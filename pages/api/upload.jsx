import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const bucketName = "nextjs-festival";
import fs from "fs";
import mime from "mime-types";

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  console.log("length:", files.file.length);
  const links = [];
  for (const file of files.file) {
    const fileExtension = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + fileExtension;
    console.log({ fileExtension, file });
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return res.json({links});
}

export const config = {
  api: { bodyParser: false },
};