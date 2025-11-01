// app/api/books/date/route.js
import { NextResponse } from 'next/server';
import { getBooksByDateRange } from '@/lib/data';
import { logRequest, successResponse, errorResponse } from '@/lib/middleware';

// GET books by date range
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    
    if (!start || !end) {
      logRequest(request, 'GET', '/api/books/date', 400);
      return errorResponse(
        'Missing required query parameters: start and end dates are required',
        400
      );
    }
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      logRequest(request, 'GET', '/api/books/date', 400);
      return errorResponse('Invalid date format. Use YYYY-MM-DD', 400);
    }
    
    const filteredBooks = getBooksByDateRange(startDate, endDate);
    
    logRequest(request, 'GET', '/api/books/date', 200);
    return successResponse({
      count: filteredBooks.length,
      data: filteredBooks
    });
  } catch (error) {
    logRequest(request, 'GET', '/api/books/date', 500);
    return errorResponse('Error filtering books by date', 500, error.message);
  }
}