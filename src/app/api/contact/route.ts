import { sendTestEmail } from "@/libs/nodemailer/gmail";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);
  const data = await request.json();

  try {
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      statusText: "OK",
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const vendor = getSearchParams(request.url);
  const body = await request.json();

  try {
    let { email, name } = body;
    // return NextResponse.json(body);
    const htmlBody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
<h2>Thank You for Contacting Us</h2>

<p style="text-transform:capitalize;">Dear ${name},</p>

<p>Thank you for reaching out to us! We have received your message and appreciate the time you took to contact us. Our team is currently reviewing your inquiry, and we will get back to you as soon as possible.</p>

<p>If your matter requires immediate attention, please feel free to call us at +254 7xx-xxx-xxx. Otherwise, please be assured that we are working diligently to provide you with a thoughtful and comprehensive response.</p>

<p>Once again, thank you for choosing <em>EasyTruck</em>. We value your interest and look forward to assisting you.</p>

<p>Best regards,<br>
<br>

</p>
</div>
`;

    let p = await sendTestEmail(email, "Confirmation Email", htmlBody, true);
    return new Response(JSON.stringify({ success: true, emailRes: p }));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, msg: error.message }),
      { status: 500 }
    );
  }
}
