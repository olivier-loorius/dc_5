"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string | React.ReactNode;
};

export default function FaqAccordion({
  items,
  type = "single",
  collapsible = true,
}: {
  items: FaqItem[];
  type?: "single" | "multiple";
  collapsible?: boolean;
}) {
  return (
    <Accordion type={type} collapsible={collapsible} className="w-full">
      {items.map((it, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="border-white/10"
        >
          <AccordionTrigger className="text-left text-[oklch(var(--text-1))] hover:no-underline">
            {it.question}
          </AccordionTrigger>
          <AccordionContent className="text-[oklch(var(--text-2))] leading-relaxed">
            {typeof it.answer === "string" ? (
              <p className="my-2">{it.answer}</p>
            ) : (
              it.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

