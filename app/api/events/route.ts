import prisma from "../../../utils/db";
import { NextRequest, NextResponse } from "next/server";

const respondWithError = (message: string, status: number) => {
  return NextResponse.json({ message }, { status });
};

export async function GET() {
  try {
    const events = await prisma.event.findMany();

    if (events && events.length > 0) {
      return NextResponse.json({ data: events }, { status: 200 });
    } else {
      return respondWithError("Events not found", 404);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return respondWithError("Internal Server Error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    const newEvent = await prisma.event.create({
      data: eventData,
    });

    return NextResponse.json({ data: newEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return respondWithError("Failed to create event", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const eventData = await request.json();
    const { id } = eventData;

    if (!id) {
      return respondWithError("Missing ID parameter", 400);
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData,
    });

    return NextResponse.json({ data: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return respondWithError("Failed to update event", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return respondWithError("Missing ID parameter", 400);
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return respondWithError("Failed to delete event", 500);
  }
}
