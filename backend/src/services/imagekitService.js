const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

function getImageKitPrivateKey() {
  const key = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!key) {
    const error = new Error("Image uploads are not configured");
    error.statusCode = 503;
    throw error;
  }
  return key;
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
  const fileName = safeFileName(file);
  const form = new FormData();
  form.append(
    "file",
    new Blob([file.buffer], { type: file.mimetype || "image/jpeg" }),
    fileName
  );
  form.append("fileName", fileName);
  form.append("folder", "/trecom/properties");
  form.append("useUniqueFileName", "true");
  form.append("tags", "property-listing");

  const privateKey = getImageKitPrivateKey();
  const response = await fetch(IMAGEKIT_UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
    },
    body: form,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.url) {
    const error = new Error(data.message || "Image upload failed");
    error.statusCode = 502;
    throw error;
  }

  return data.url;
}

async function uploadImagesToImageKit(files) {
  const urls = [];
  for (const file of files) {
    urls.push(await uploadImage(file));
  }
  return urls;
}

module.exports = { uploadImagesToImageKit };
