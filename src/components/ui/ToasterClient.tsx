"use client";
import { useEffect, Suspense } from "react";
import { Toaster, toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";

function ToasterLogic() {
  const params = useSearchParams();
  useEffect(() => {
    const ob = params.get("onboarding");
    const err = params.get("error");
    if (ob === "done") {
      toast.success("Profil complété", {
        description: "Votre compte est prêt.",
        duration: 5000,
        icon: (
          <span className="text-[color:var(--brand,#e19a28)]">
            <FontAwesomeIcon icon={faCircleCheck} />
          </span>
        ),
      });
    }
    if (err === "mustBeAdult") {
      toast.error("Vous devez avoir 18 ans ou plus", {
        description: "Veuillez saisir une date valide.",
        duration: 5000,
        icon: (
          <span className="text-red-400">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </span>
        ),
      });
    }
  }, [params]);
  return null;
}

export function ToasterClient() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              "bg-[rgba(12,12,14,0.78)] text-white border border-white/10 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md px-4 py-2 text-[13px]",
            description: "text-white/80",
            actionButton:
              "rounded-full bg-[color:var(--brand,#e19a28)] text-black hover:brightness-95",
            cancelButton:
              "rounded-full bg-white/10 text-white hover:bg-white/15",
          },
        }}
        closeButton
      />
      <Suspense fallback={null}>
        <ToasterLogic />
      </Suspense>
    </>
  );
}
