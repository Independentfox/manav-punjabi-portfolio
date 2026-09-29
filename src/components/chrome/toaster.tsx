"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { TOAST_EVENT } from "@/lib/hooks";

export function Toaster() {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    let timer = 0;
    const onToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setMessage({ id: Date.now(), text });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-0 top-6 z-[85] flex justify-center px-4"
    >
      <AnimatePresence>
        {message ? (
          <m.div
            key={message.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 rounded-full border border-line-strong bg-card px-4 py-2.5 text-sm text-fg shadow-2xl"
          >
            <span className="size-1.5 rounded-full bg-peach" aria-hidden />
            {message.text}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
