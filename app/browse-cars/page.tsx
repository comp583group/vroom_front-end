import { Suspense } from "react";
import BrowseCarsClient from "@/components/cars/BrowseCarsClient";

export default function BrowseCarsPage() {
  return (
    <Suspense fallback={<div>Loading cars...</div>}>
      <BrowseCarsClient />
    </Suspense>
  );
}