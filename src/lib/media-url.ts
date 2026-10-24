const MEDIA_ORIGIN = "https://eclectic-pune-architecture.lovable.app";

/** Asset pointers need a hosted origin outside Lovable's asset proxy. */
export function mediaUrl(asset: { url: string }): string {
  return asset.url.startsWith("/__l5e/assets-v1/")
    ? new URL(asset.url, MEDIA_ORIGIN).href
    : asset.url;
}