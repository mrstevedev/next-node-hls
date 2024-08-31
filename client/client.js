const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

const params = {
  Region: process.env.AWS_S3_REGION,
  Bucket: process.env.AWS_S3_BUCKET,
  Key: null,
  Body: null,
};

module.exports = { s3, params };
