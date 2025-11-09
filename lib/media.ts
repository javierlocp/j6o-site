// This is a tiny path builder for public/assets/*
type AssetKind = "posts" | "explorations";

const join = (parts: string[]) =>
  "/" +
  parts
    .map((p) => String(p || "").replace(/^\/+|\/+$/g, "")) // trim slashes
    .filter(Boolean)
    .join("/");

export const contentAsset = (kind: AssetKind, slug: string, file: string) => {
  if (!kind || !slug || !file) return "";
  const path = join(["assets", kind, slug, file]); // => /assets/kind/slug/file
  if (process.env.NODE_ENV === "development") {
    fetch(path)
      .then((res) => {
        if (!res.ok) console.warn(`[Missing asset] ${path}`);
      })
      .catch(() => console.warn(`[Asset check failed] ${path}`));
  }
  return path;
};

export const postAsset = (slug: string, file: string) =>
  contentAsset("posts", slug, file);

export const explorationAsset = (slug: string, file: string) =>
  contentAsset("explorations", slug, file);

// Simple video detector
export const isVideoSrc = (src: string) =>
  /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);
