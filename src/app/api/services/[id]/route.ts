import { NextRequest, NextResponse } from "next/server";
import { updateService, deleteService } from "@/lib/config";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = updateService(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/services/:id]", err);
    return NextResponse.json({ error: "Failed to update service", detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = deleteService(id);
    if (!ok) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/services/:id]", err);
    return NextResponse.json({ error: "Failed to delete service", detail: String(err) }, { status: 500 });
  }
}
