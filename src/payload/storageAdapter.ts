import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { S3Client } from '@aws-sdk/client-s3'

export const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.ENDPOINT,
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
  },
  bucket: process.env.BUCKET,
})
