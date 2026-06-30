import Image from "next/image";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  sizes: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  background?: string;
};

// Image zoom was removed per design. The aspect-ratio container still reserves
// layout space so the page height is correct before the image loads.
export default function ZoomableImage({
  src,
  alt,
  aspectRatio,
  sizes,
  fit = "cover",
  priority = false,
  background,
}: ZoomableImageProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl relative"
      style={{ aspectRatio, background }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={fit === "contain" ? "object-contain" : "object-cover"}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
