"use client";

import { useActionState, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, situations } from "@/lib/site";
import { sendMessage, type ContactState } from "@/lib/contact-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const form = site.contact.form;

const labelClass =
  "font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase";

// h-12 because the installed control sizes (h-8) sit well below both the
// design and a comfortable touch target.
const controlClass = "h-12 rounded-lg";

const initialState: ContactState = { ok: false };

const EMPTY = { name: "", email: "", situation: "", message: "" };

type Field = keyof typeof EMPTY;

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {children}
    </p>
  );
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    initialState
  );

  // Controlled on purpose: React clears uncontrolled fields once an action
  // completes, which would wipe everything the visitor typed whenever
  // validation fails. Feeding values back via `defaultValue` instead would
  // mutate an uncontrolled input's default, which Base UI warns about.
  const [fields, setFields] = useState(EMPTY);

  // Clear the form once a submission succeeds. Adjusting state during render —
  // not from an effect — is what React recommends for deriving state from a
  // change: it re-runs this component before committing, instead of painting
  // the stale values and then scheduling a second, cascading render.
  const [seenResult, setSeenResult] = useState(state);
  if (seenResult !== state) {
    setSeenResult(state);
    if (state.ok) setFields(EMPTY);
  }

  const update =
    (key: Field) =>
    (event: { target: { value: string } }) =>
      setFields((current) => ({ ...current, [key]: event.target.value }));

  // Native validation is on (no `noValidate`): the required/minLength/maxLength
  // constraints on each control mirror the rules in contact-action.ts, so the
  // browser catches obvious mistakes without a round trip. The action still
  // re-validates everything — client checks are a convenience, not a boundary.
  const errors = state.errors ?? {};
  const describedBy = (field: Field) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className={labelClass}>
            {form.name.label}
          </Label>
          <Input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            placeholder={form.name.placeholder}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={cn(controlClass, "mt-2")}
          />
          <FieldError id="name-error">{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor="email" className={labelClass}>
            {form.email.label}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            placeholder={form.email.placeholder}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={cn(controlClass, "mt-2")}
          />
          <FieldError id="email-error">{errors.email}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="situation" className={labelClass}>
          {form.situation.label}
        </Label>
        {/* Native select: keeps the OS chevron and picker, and works without
            JavaScript. No appearance-none, so the arrow survives. */}
        <select
          id="situation"
          name="situation"
          required
          value={fields.situation}
          onChange={update("situation")}
          aria-invalid={!!errors.situation}
          aria-describedby={describedBy("situation")}
          className={cn(
            controlClass,
            "mt-2 w-full border border-input bg-input/30 px-2.5 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
            // The dropdown list takes its colours from the option elements, and
            // the field's translucent fill renders unpredictably there — so the
            // options get an explicit opaque background of their own.
            "[&>option]:bg-popover [&>option]:text-popover-foreground [&>option:disabled]:text-muted-foreground"
          )}
        >
          <option value="" disabled>
            {form.situation.placeholder}
          </option>
          {situations.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id="situation-error">{errors.situation}</FieldError>
      </div>

      <div>
        <Label htmlFor="message" className={labelClass}>
          {form.message.label}
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={fields.message}
          onChange={update("message")}
          placeholder={form.message.placeholder}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className="mt-2 min-h-32 rounded-lg"
        />
        <FieldError id="message-error">{errors.message}</FieldError>
      </div>

      <Button type="submit" disabled={isPending} className="group/button h-12">
        {isPending ? form.sending : form.submit}
        {!isPending && (
          <ArrowRightIcon className="transition-transform duration-200 group-hover/button:translate-x-1" />
        )}
      </Button>

      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            state.ok ? "text-foreground" : "text-destructive"
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

export { ContactForm };
