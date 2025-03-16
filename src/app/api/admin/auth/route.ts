import { NextResponse } from 'next/server';

// For demo purposes only - in a real app, this would use proper auth
// This is Michael's temporary password for development
const ADMIN_PASSWORD = "prince95arthur";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { password } = data;
    
    if (password === ADMIN_PASSWORD) {
      // In a real application, we would:
      // 1. Use proper authentication with hashed passwords
      // 2. Create a JWT or session
      // 3. Set HTTP-only cookies
      // This is simplified for demo purposes
      
      return NextResponse.json({
        success: true,
        message: "Welcome to the 95 Prince Arthur Survey admin dashboard",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid password"
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({
      success: false,
      message: "Authentication error"
    }, { status: 500 });
  }
} 