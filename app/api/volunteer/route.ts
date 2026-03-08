import { NextRequest, NextResponse } from "next/server";

interface VolunteerPayload {
  name: string;
  phone: string;
  email: string;
  area?: string;
  message?: string;
}

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body: VolunteerPayload = await req.json();
    const { name, phone, email, area, message } = body;

    // Validate
    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const sanitized = {
      name: sanitize(name),
      phone: sanitize(phone),
      email: sanitize(email),
      area: area ? sanitize(area) : "",
      message: message ? sanitize(message).slice(0, 500) : "",
      submittedAt: new Date().toISOString(),
    };

    // In production: save to database or send email notification
    // For now, log it (replace with your DB/email logic)
    console.log("[Volunteer Application]", sanitized);

    return NextResponse.json({
      success: true,
      message: "Application received! We'll contact you soon.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
