import {
  createRecord,
  getRecordByFields,
  getRecords,
} from "@/libs/mongoose/mongoseCrud";
import { getSearchParams } from "@/utils/key_functions";
const table = "routes";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);

  try {
    let data;
    if (vendor) {
      data = await getRecordByFields(table, { vendor });
    } else {
      data = await getRecords(table);
    }

    return new Response(JSON.stringify(data), {
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
  try {
    let body = await request.json();

    const result = await createRecord(table, body);

    return new Response(JSON.stringify({ result }), { status: 201 });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
