import { PutObjectCommand } from "@aws-sdk/client-s3"
import { env } from "../config/env"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./s3";

export async function createPresignedUpload(params: {
    userId: string
    fileType: string
}) {

    const uploadId = crypto.randomUUID()

    const key = `uploads/${params.userId}/${uploadId}`

    const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
        ContentType: params.fileType
    })

    const url = await getSignedUrl(s3, command, {
        expiresIn: 60 * 10
    })

    return {
        uploadId,
        key,
        url
    }

}