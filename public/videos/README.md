# Scene videos

Place loopable H.264 MP4 files here (typically 8–30 seconds, web-optimised with faststart):

- `rain.mp4`
- `ocean.mp4`
- `mountains.mp4`
- `forest.mp4`
- `fireplace.mp4`
- `waterfall.mp4`
- `sunrise.mp4`
- `aurora.mp4`

Example encode:

```bash
ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an rain.mp4
```

If a file is missing, the player shows the Unsplash thumbnail with a “Video coming soon” overlay.
