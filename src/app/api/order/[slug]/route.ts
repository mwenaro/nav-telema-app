import { deleteRecord, getRecordById, updateRecord } from '@/libs/mongoose/mongoseCrud';


const table = 'Products';
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
    return new Response(JSON.stringify({message:error.message}), {status:500});;
  }
}

export async function DELETE(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const result = await deleteRecord(table,slug);
    return new Response(JSON.stringify({success:true,  message: result }), {status:500});

    
  } catch (error: any) {
    return new Response(JSON.stringify({message:error.message}), {status:500});
  }
}
export async function PUT(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  let body = await request.json();

 try{
  const result = await updateRecord(table, slug, body);
  return new Response(JSON.stringify({success:true,  message: result }), {status:500});

  } catch (error: any) {
    return new Response(JSON.stringify({message:error.message}), {status:500});
  }
}