import prisma from "../../../utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany();

    if (events && events.length > 0) {
      return NextResponse.json({ data: events }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Events not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const eventData = await request.json();

  try {
    const newEvent = await prisma.event.create({
      data: eventData,
    });

    return NextResponse.json({ data: newEvent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const eventData = await request.json();
  const { id } = eventData;

  if (!id) {
    return NextResponse.json(
      { message: "Missing ID parameter" },
      { status: 400 }
    );
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: eventData,
    });

    return NextResponse.json({ data: updatedEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "Missing ID parameter" },
      { status: 400 }
    );
  }

  try {
    await prisma.event.delete({
      where: { id: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
