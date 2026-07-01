import { NextRequest, NextResponse } from "next/server";
import { getServices, addService } from "@/lib/config";

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json(services);
  } catch (err) {
    console.error("[GET /api/services]", err);
    return NextResponse.json({ error: "Failed to read config", detail: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, url, local_url, description, summary, category, icon, status } = body;

    if (!name || !url || !category) {
      return NextResponse.json(
        { error: "name, url, and category are required" },
        { status: 400 }
      );
    }

    const service = addService({
      name,
      url,
      local_url: local_url ?? "",
      description: description ?? "",
      summary: summary ?? "",
      category,
      icon: icon ?? "",
      status: status ?? "operating",
    });

    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    console.error("[POST /api/services]", err);
    return NextResponse.json({ error: "Failed to save service", detail: String(err) }, { status: 500 });
  }
}
