import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env";
import fs from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function downloadFromS3(params: {
    key: string;
    outputPath: string;
}) {
    const response = await s3.send(
        new GetObjectCommand({
            Bucket: env.S3_BUCKET,
            Key: params.key,
        })
    );

    if (!response.Body) {
        throw new Error("S3 object body missing");
    }

    await pipeline(
        response.Body as Readable,
        fs.createWriteStream(params.outputPath)
    );
    return params.outputPath;
}