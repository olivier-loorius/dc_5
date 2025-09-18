"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function QuickActions() {
  const t = useTranslations("footer");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[60] flex flex-col items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/10 bg-transparent hover:bg-white/5 focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          aria-label={t("scroll_top") as string}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className="h-4 w-4 text-[color:var(--brand)]"
          />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/10 bg-transparent hover:bg-white/5 focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          aria-haspopup="dialog"
          aria-expanded={isSettingsOpen}
          aria-label={t("settings") as string}
          onClick={() => setIsSettingsOpen(true)}
        >
          <FontAwesomeIcon
            icon={faGear}
            className="h-4 w-4 text-[color:var(--brand)]"
          />
        </Button>
      </div>

      {isSettingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end md:items-start justify-center p-3 md:p-6"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="w-full max-w-md md:mt-20 rounded-lg border border-white/10 bg-background/90 p-4 text-sm max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="section-title">{t("settings")}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("close") as string}
                onClick={() => setIsSettingsOpen(false)}
              >
                <span className="text-2xl leading-none">×</span>
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="block mb-1">{t("language")}</span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    aria-disabled
                  >
                    FR
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    aria-disabled
                  >
                    EN
                  </Button>
                </div>
              </div>
              <div>
                <span className="block mb-1">{t("theme")}</span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    aria-disabled
                  >
                    {t("dark")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    aria-disabled
                  >
                    {t("light")}
                  </Button>
                </div>
              </div>
              <div>
                <Link href="/cookies" className="footer-link">
                  {t("cookies_manage")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
