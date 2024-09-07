/**
 * This is a Node.js file that will convert .wav and .mp3 files
 * from the downloads folder into HLS mp3u8 stream playlist files with stream chunks.
 * The conversion process will put the files into /public/audio/streams.
 *
 * - Directions -
 * 1. Find an MP3 file you want to convert
 * 2. Place it in the downloads folder
 * 3. Run the command `node app.ts`
 * 4. Observe the new folder in /public/audio/streams
 * 5. Observe the stream files uploaded to the S3 Bucket.
 *
 * For best practice, make ure the song names are short,
 * if its two words, separate the space with an underscore
 *
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { s3 } = require("./client/client");
const { Upload } = require("@aws-sdk/lib-storage");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

/**
 * - Steps -
 * 1. Create downloads directory if it doesnt exist
 * 2. Read downloads directory and loop over the files
 * 3. Get files name of files
 * 4. Create a directory based on the file name to output to
 * 5. Create a file name and path for files to be output to
 * 6. create destination folder if it does not exist
 * 7. exec and run the ffmpeg command to create hls stream chunks.
 * 8. TODO - Upload these created chunk files to S3.
 */

const downloadsDir = "downloads";

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

fs.readdir(downloadsDir, (err: { message: any }, files: any[]) => {
  if (err instanceof Error) {
    if (err) {
      console.error(err.message);

      return;
    }
  }

  files.map((file: string) => {
    const fileName = path.join(downloadsDir, file);

    const chapterId = file.split(/.mp3|.wav/)[0];

    const dest = `public/audio/streams/${chapterId}`;

    const outputFilename = `${chapterId}.m3u8`;
    const outputPath = path.join(dest, outputFilename);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const command = `ffmpeg -i ${fileName} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputPath}`;
    exec(command, (error: any) => {
      if (error) {
        console.error(`ffmpeg exec error: ${error}`);
      }
    });

    fs.watch(dest, () => {
      fs.readdir(dest, (err: any, files: any[]) => {
        files.forEach(async (file: string) => {
          const fpath = path.join(
            `public/audio/streams/${
              file.split(/.m3u8|[0-9][0-2]?.ts/)[0]
            }/${file}`
          );
          const stream = fs.createReadStream(fpath);
          const Key = stream.path.split("/")[4];
          // console.log(Key);

          const upload = new Upload({
            client: s3,
            params: {
              Bucket: process.env.AWS_S3_BUCKET,
              Key: Key,
              //!! ERROR: @smithy/node-http-handler:WARN - socket usage at capacity=50 and 118 additional requests are enqueued.
              //!! SlowDown: Please reduce your request rate.
              //!! WARN - socket usage at capacity=50 and 654 additional requests are enqueued.
              //!! See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
              //!! or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.
              Body: stream,
            },
          });
          await upload.done();
        });
      });
    });
  });
});
