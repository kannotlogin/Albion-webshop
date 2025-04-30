import { s3Adapter as createS3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import dotenv from 'dotenv'

dotenv.config()

export const s3Adapter = createS3Adapter({
  config: {
    region: process.env.REGION as string,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
    },
  },
  bucket: process.env.BUCKET as string,
})
