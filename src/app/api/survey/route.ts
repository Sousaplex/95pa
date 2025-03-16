import { NextRequest, NextResponse } from 'next/server';

// In a real app, this would connect to a database
// For now, we'll store submissions in memory
const surveySubmissions: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Add timestamp
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
      building: '95 Prince Arthur Ave'
    };
    
    // Store the submission
    surveySubmissions.push(submission);
    
    // Log for development purposes only
    console.log('Survey submission received:', submission);
    
    return NextResponse.json({ 
      message: 'Thank you for your feedback! Your input will help improve 95 Prince Arthur.',
      success: true
    });
  } catch (error) {
    console.error('Error processing survey submission:', error);
    return NextResponse.json({ 
      message: 'There was an error submitting your feedback. Please try again.',
      success: false 
    }, { status: 500 });
  }
}

export async function GET() {
  // Note: In production, this endpoint would be protected
  return NextResponse.json({ 
    count: surveySubmissions.length,
    submissions: surveySubmissions 
  });
} 