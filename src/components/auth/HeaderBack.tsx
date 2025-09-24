"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function HeaderBack({ href, label }: { href?: string; label: string }) {
  const router = useRouter();
  return (
    <div className="mb-4 flex items-center">
      <button
        type="button"
        aria-label={label}
        className="mr-2 text-white/80 hover:text-white"
        onClick={() => (href ? router.push(href) : router.back())}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
      </button>
      <span className="sr-only">{label}</span>
    </div>
  );
}
