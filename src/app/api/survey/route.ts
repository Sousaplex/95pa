import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Raw incoming data:', data);
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data));

    // Insert the data directly without field name conversion
    const { error } = await supabase
      .from('survey_submissions')
      .insert([{
        ...data,
        building: '95 Prince Arthur Ave'
      }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { message: 'Error submitting survey' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error('Error processing survey submission:', error);
    return NextResponse.json(
      { message: 'Error submitting survey' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('survey_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ submissions: data });
  } catch (error) {
    console.error('Error fetching survey submissions:', error);
    return NextResponse.json({ 
      message: 'Error fetching survey submissions',
      success: false 
    }, { status: 500 });
  }
} 