import { handleFileUpload } from "@/utils/upload";



export async function POST(request: Request) {
  const data = await request.formData();

  try {
    const res = await handleFileUpload((data.get("file")||data.get("image") ) as unknown as File);
    if(!res.success) throw new Error("An error occured while uploading")
    return new Response(JSON.stringify(res));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
