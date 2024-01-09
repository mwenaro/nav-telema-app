import { sendTestEmail } from "@/libs/nodemailer/gmail";

import { UserModel } from "@/libs/mongoose/models";
import { dbCon } from "@/libs/mongoose/dbCon";

// c9XddCqLzuNiDNDQ




export async function POST(request: Request) {
    try {
        let body = await request.json(),
            { email, name, subject } = body;
        // return Response.json(body);


        let p = await sendTestEmail(email, subject, "Another Email Test");
        return Response.json({ msg: 'Email sent successfully ', p });
    } catch (error: any) {
        console.log({ error: error.message });
        return new Response(JSON.stringify({message:error.message}), {status:500});;

    }
}

export async function GET(request: Request) {
  
    try {
        await dbCon()
        let user = new UserModel({
            "name": "mwero1",
            "email": "mwero1@gmail.com",
            "role": "vendor",
            "status": "active",
            "phone": "0735275068",
            "password": "pwd@1211"
        });
        let created = await user.save()
        return Response.json({ msg: 'creat tesing ', created });
    } catch (error: any) {
        console.log({ error: error.message });
        return new Response(JSON.stringify({message:error.message}), {status:500});;

    } 
}