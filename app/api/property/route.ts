import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface PropertyData {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ErrorResponse {
  message: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ message: 'Query is required' }, { status: 400 });
  }

  const apiKey = process.env.REAL_ESTATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key is missing' }, { status: 500 });
  }

  const apiUrl = `https://apiscrapy.com/real-estate-api/v1/properties?search=${encodeURIComponent(query)}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      let errorData: ErrorResponse = { message: 'Unknown error' };

      try {
        const responseBody = await response.text();
        try {
          errorData = JSON.parse(responseBody);
        } catch {
          console.error('Failed to parse error response as JSON');
        }
      } catch (innerError) {
        console.error('Error reading response body:', innerError);
      }

      return NextResponse.json({ error: errorData.message || 'Unknown error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data as PropertyData[]);
  } catch (error) {
    console.error('Error fetching property data:', error);
    return NextResponse.json({ error: 'Error fetching property data' }, { status: 500 });
  }
}
