<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Resolve hosted asset pointers through `src/lib/media-url.ts` in UI code; the absolute hosted origin makes the same media available in local clones without Lovable's local asset proxy. Keep bundled image imports unchanged.
- Prefer a stream-copied H.264 MP4 with fast-start metadata and codec-level letterbox cropping for the hero; retain a full-resolution VP9 fallback for browsers without H.264 decoding, because the primary preserves original picture detail while the fallback ensures playback compatibility.
