const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3();

async function subirBase64AS3(base64Data, folder, extension = "jpg") {
  const buffer = Buffer.from(base64Data, "base64");
  const fileName = `${folder}/${uuidv4()}.${extension}`;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: `image/${extension}`,
    ACL: "public-read"
  };
  await s3.upload(params).promise();
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;
}

module.exports = { subirBase64AS3 };
