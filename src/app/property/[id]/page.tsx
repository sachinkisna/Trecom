import { marketplaceProperties } from "@/data/properties";
import PropertyDetailClient from "./PropertyDetailClient";

export function generateStaticParams() {
  return marketplaceProperties.map((p) => ({ id: String(p.id) }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
