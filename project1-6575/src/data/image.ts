// Vite includes matching image files when building, and provides their URLs.
// The supplied data.ts has paths such as "src/assets/images/product-1.png".
const images = import.meta.glob<string>(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  { eager: true, query: "?url", import: "default" },
);

export function getProductImage(imagePath: string): string {
  const fileName = imagePath.split("/").pop();
  return images[`../assets/images/${fileName}`] ?? "/product-placeholder.svg";
}
