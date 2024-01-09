import { sendTestEmail } from "@/libs/nodemailer/gmail";


export async function POST(request: Request) {
    try {
        let body = await request.json(),
            { email, name, subject } = body;
            // return Response.json(body);


        let p = await sendTestEmail(email, subject, "Another Email Test");
        return Response.json({ msg: 'Email sent successfully ', p });
    } catch (error: any) {
        console.log({ error: error.message });
        return Response.json({ error: error.message });
      
    }
}