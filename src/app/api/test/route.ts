import { defProducts as products } from "@/dummy_data/products";
import { createRecord, getRecords } from "@/libs/mongoose/mongoseCrud";

const table = "products";

export async function GET(request: Request) {
  try {
    const data = await getRecords(table);

    return new Response(
      JSON.stringify(Object.values(data).length > 0 ? data : products),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    let body = await request.json();

    const result = await createRecord(table, body);

    return new Response(JSON.stringify({success:true, message:result}))
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({success:false, msg: error.message}), {status:500});
  }
}
