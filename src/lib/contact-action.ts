"use server";

import { Resend } from "resend";

import { site, situations } from "@/lib/site";

type Fields = "name" | "email" | "situation" | "message";

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<Fields, string>>;
};

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Fields, string>) {
  const errors: Partial<Record<Fields, string>> = {};

  if (values.name.length < 2 || values.name.length > 80) {
    errors.name = "Please give a name between 2 and 80 characters.";
  }
  if (!EMAIL_SHAPE.test(values.email) || values.email.length > 200) {
    errors.email = "Please enter an email address I can reply to.";
  }
  // Guards against a tampered payload, not just an empty select.
  if (!situations.includes(values.situation)) {
    errors.situation = "Please pick the option that fits best.";
  }
  if (values.message.length < 10 || values.message.length > 2000) {
    errors.message = "Please write between 10 and 2000 characters.";
  }

  return errors;
}

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    situation: String(formData.get("situation") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // Read the key at call time, never at module scope — an absent key must
  // surface as a readable message rather than throwing on import.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;

  if (!apiKey) {
    return {
      ok: false,
      message: `Email isn't configured yet. Please reach me directly at ${site.contact.email}.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Resend's sandbox sender. Swap for an address on a verified domain
      // to deliver to recipients other than the account owner.
      from: "Portfolio",
      to,
      replyTo: values.email,
      subject: `${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Situation: ${values.situation}`,
        "",
        values.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return {
        ok: false,
        message: `That didn't send. Please email me at ${site.contact.email}.`,
      };
    }

    return { ok: true, message: site.contact.form.success };
  } catch (cause) {
    console.error("Failed to send contact message:", cause);
    return {
      ok: false,
      message: `Something broke on my end. Please email me at ${site.contact.email}.`,
    };
  }
}
