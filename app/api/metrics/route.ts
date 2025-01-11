import { NextResponse } from 'next/server';
import { register } from 'prom-client';

export async function GET() {
  return new NextResponse(await register.metrics(), {
    headers: {
      'Content-Type': register.contentType
    }
  });
}