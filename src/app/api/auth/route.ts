import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const envPassword = process.env.SYSTEM_PASSWORD || 'iamgainer123';
    const envEmail = process.env.SYSTEM_EMAIL || 'gaiersfuture@gmail.com';

    if (email === envEmail && password === envPassword) {
      // Create a simple token to store in the cookie
      const token = Buffer.from(`${email}:${password}`).toString('base64');
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
