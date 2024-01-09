import { deleteRecord, getRecordById, updateRecord } from '@/libs/mongoose/mongoseCrud';
import { Response } from 'next/server';

const table = 'Users';
export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const product = await getRecordById(table, slug);
    if (product) {
      return new Response(JSON.stringify(product));
    } else {
      return Response.json({ error: `${table.substring(0,table.length-2)} not found` }, {status:400});
    }
    
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}

export async function DELETE(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const result = await deleteRecord(table,slug);
    return Response.json({success:true,  message: result });

    
  } catch (error: any) {
    return Response.json({ error: error.message }, {status:500});
  }
}
export async function PUT(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  let body = await request.json();

 try{
  const result = await updateRecord(table, slug, body);
  return Response.json({success:true,  message: result });

  } catch (error: any) {
    return Response.json({ error: error.message }, {status:500});
  }
}