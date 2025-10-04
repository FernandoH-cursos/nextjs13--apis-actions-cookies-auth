import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    message: "Hola mundo!!!",
    method: request.method,
    url: request.url,
  });
}


export async function POST(request: Request) {
  return NextResponse.json({
    message: "Hola mundo!!!",
    method: request.method,
    url: request.url,
  });
}

