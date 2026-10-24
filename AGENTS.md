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
- Keep the projects gallery on native horizontal overflow with column-based scroll snapping, preserving stacked cards; native scrolling supports touch, keyboard, wheel and drag without tying gallery position to page scroll.
