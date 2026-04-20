import axios from "axios";
import fs from "fs";
import FormData from "form-data";

import { env } from "../config/env";

export async function transcribeAudio(filePath: string) {
    const form = new FormData();

    form.append("file", fs.createReadStream(filePath));

    const res = await axios.post(
        `${env.WHISPER_API_URL}/transcribe`,
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );

    return res.data;
}