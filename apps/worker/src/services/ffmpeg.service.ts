import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

if (!ffmpegPath) {
    throw new Error("ffmpeg-static binary not found");
}

ffmpeg.setFfmpegPath(ffmpegPath);

export async function convertAudioToStandardWav(inputPath: string, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
            .audioChannels(1)
            .audioFrequency(16000)
            .audioCodec("pcm_s16le")
            .format("wav")
            .on("end", () => resolve())
            .on("error", (err) => reject(err))
            .save(outputPath);
    });
}