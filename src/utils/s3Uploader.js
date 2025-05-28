const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const isOffline = Boolean(process.env.IS_OFFLINE);
const BUCKET = process.env.BUCKET_NAME;

const s3Client = new S3Client({
  ...(isOffline && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
});

async function subirBase64AS3(base64Data, folder, extension = "jpg") {
  const buffer = Buffer.from(base64Data, "base64");
  const fileName = `${folder}/${uuidv4()}.${extension}`;
  
  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: `image/${extension}`,
  };

  await s3Client.send(new PutObjectCommand(params));
  return `https://${BUCKET}.s3.amazonaws.com/${fileName}`;
}

module.exports = { subirBase64AS3 };
