

const table = 'users';
export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    return Response.json({});
  } catch (error: any) {
    return new Response(JSON.stringify({message:error.message}), {status:500});;
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: any } }
) {
  try {
   

    return Response.json({ resp:"Hello" });
  } catch (error: any) {
    return new Response(JSON.stringify({message:error.message}), {status:500});;
  }
}
export async function PUT(
  request: Request,
  { params }: { params: { slug: any } }
) {
  let body = await request.json();

 try{

    return Response.json({ resp:"" });
  } catch (error: any) {
    return new Response(JSON.stringify({message:error.message}), {status:500});;
  }
}