import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.append('Access-Control-Allow-Origin', '*');
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}
