import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 backdrop-blur-lg z-50">
      <p className="text-4xl">Please wait...</p>
      <LoaderCircle size={50} className="animate-spin" color="#001b2eff" />
    </div>
  );
}
