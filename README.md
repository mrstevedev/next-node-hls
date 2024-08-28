# BBP Music Library HTTP Live Streaming

Custom audio player from BBPMusicLibrary.
Audio streaming with HTTP Live streaming (HLS).
Node.js process runs exec on ffmpeg command to chunk wav and mp3 files into /audio/streams then uploads to an S3 bucket.

Storefront built using:

1. Next.js 14
2. React-Bootstrap
3. Typescript
4. HTTP Live Streaming (HLS)
5. ffmpeg

### Notes

To run this project locally:

1.  `git clone https://github.com/mrstevedev/next-node-hls.git`

2.  `pnpm` to install dependencies.

3.  `pnpm dev` to run the Next server.

4.  `pnpm start` to start production build.

Open http://localhost:3000 with your browser to see the result.
