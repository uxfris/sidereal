import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";

export async function createTempFilePath(ext: string) {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "lume-"));
    const filename = `${crypto.randomUUID()}${ext}`;
    return path.join(dir, filename);
}