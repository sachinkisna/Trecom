import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description:
    "List your property with TRECOM and reach genuine buyers across Bangalore.",
};

export default function SellPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
