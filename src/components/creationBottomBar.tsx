import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreationSubmit from "./creationSubmit";

export default function CreationBottomBar() {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white dark:bg-slate-900 border-t h-24">
      <div className="flex justify-between items-center mx-auto px-5 pg:px-10 h-full">
        <Button className="bg-gray-600 text-white" size="lg" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}
