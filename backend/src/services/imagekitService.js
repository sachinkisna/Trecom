const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

function getImageKitPrivateKey() {
  return process.env.IMAGEKIT_PRIVATE_KEY || null;
}

function safeFileName(file) {
  const original = String(file.originalname || "property-image.jpg");
  const rawExtension = original.includes(".") ? original.slice(original.lastIndexOf(".")).toLowerCase() : ".jpg";
  const extension = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(rawExtension)
    ? rawExtension
    : ".jpg";
  const base = original.slice(0, original.length - extension.length)
    .replace(/[^a-z0-9.-]/gi, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "property-image";

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${base}${extension.toLowerCase()}`;
}

async function uploadImage(file) {
  const base64Data = file.buffer.toString("base64");
  const mimeType = file.mimetype || "image/jpeg";
  const privateKey = getImageKitPrivateKey();

  if (!privateKey) {
    return `data:${mimeType};base64,${base64Data}`;
  }

  const fileName = safeFileName(file);
  const params = new URLSearchParams();
  params.append("file", base64Data);
  params.append("fileName", fileName);
  params.append("folder", "/trecom/properties");
  params.append("useUniqueFileName", "true");
  params.append("tags", "property-listing");

  try {
    const response = await fetch(IMAGEKIT_UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.url) {
      console.warn("ImageKit upload warning:", data.message || response.statusText);
      return `data:${mimeType};base64,${base64Data}`;
    }

    return data.url;
  } catch (err) {
    console.warn("ImageKit upload error:", err.message);
    return `data:${mimeType};base64,${base64Data}`;
  }
}

async function uploadImagesToImageKit(files) {
  const urls = [];
  for (const file of files) {
    urls.push(await uploadImage(file));
  }
  return urls;
}

module.exports = { uploadImagesToImageKit };
