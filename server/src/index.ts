import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import nodemailer from "nodemailer";

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 3001;

const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
);

const mailer = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: (Number(process.env.SMTP_PORT) || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

async function sendEnquiryEmail(data: {
  name: string;
  phone: string;
  course: string;
  message: string;
}) {
  if (!mailer) return;
  await mailer.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
    replyTo: process.env.SMTP_USER,
    subject: `New enquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Course: ${data.course || "—"}`,
      `Message: ${data.message || "—"}`,
    ].join("\n"),
  });
}

app.use(helmet());
app.use(cors());
app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many submissions, please try again later." },
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required").max(15),
  course: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.errors.map((e) => e.message).join(", "),
    });
    return;
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    sendEnquiryEmail(parsed.data).catch((err) =>
      console.error("Email error:", err)
    );

    res.status(201).json({ id: submission.id, message: "Enquiry received" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

app.get("/api/contact", async (_req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json(submissions);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
