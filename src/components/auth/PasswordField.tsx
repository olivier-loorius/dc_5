"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type PasswordFieldProps = {
  id: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  invalidHint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordField({
  id,
  name,
  required,
  autoComplete,
  placeholder,
  invalidHint,
  value,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="grid gap-1.5">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#e19a28]">
          <FontAwesomeIcon icon={faLock} className="h-5 w-5" />
        </span>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={value || ""}
          onChange={onChange}
          className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-10 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
        />
        <button
          type="button"
          aria-label={
            visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 text-brand hover:text-brand/90"
          onClick={() => setVisible((v) => !v)}
        >
          <FontAwesomeIcon
            icon={visible ? faEyeSlash : faEye}
            className="h-4 w-4"
          />
        </button>
      </div>
      {invalidHint ? (
        <p className="hidden peer-invalid:block text-xs text-destructive">
          {invalidHint}
        </p>
      ) : null}
    </div>
  );
}
