import { pwdHasher } from "@/libs/bcrypt/passord";

import { NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";

import { getSearchParams } from "@/utils/key_functions";

import { generateUniqueToken } from "@/libs/uniqueKey";

import { DriverModel } from "@/libs/mongoose/models/driver";
const table = "drivers";
const headers: any = {
  "Content-Type": "application/json",
};
export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);
  try {
    let data;
    await dbCon();
    data = await DriverModel.find({});

    return new Response(
      JSON.stringify(
        data.sort((a: any, b: any) => b.created_at - a.created_at) || []
      ),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}

export async function POST(request: Request) {
  try {
    let obody = await request.json(),
      { confirmPassword, ...body } = obody;

    body["status"] = false;

    const hashedPassword = pwdHasher(body["password"]);
    body["password"] = hashedPassword;

    // const result = await createRecord(table, body);
    await dbCon();

    const newDriver = new DriverModel(body);
    let activationToken = await generateUniqueToken();
    // let createdActivationRecord = await createDriverActivationRecord(
    //   body["email"],
    //   activationToken
    // );

    // if (!createdActivationRecord) throw new Error("Errormessage=>");

    let saved = await newDriver.save();

    // const emailStatus = await handlesendConfirmationEmail(
    //   body.name.split(" ")[0] || "",
    //   body["email"],
    //   activationToken
    // );

    return new NextResponse(JSON.stringify({ success: true, saved, body }), {
      status: 201,
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}
