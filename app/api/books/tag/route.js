// app/api/books/tag/route.js
import { NextResponse } from 'next/server';
import { getFeaturedBooks } from '@/lib/data';
import { logRequest, successResponse, errorResponse } from '@/lib/middleware';

// GET featured books
export async function GET(request) {
  try {
    const featuredBooks = getFeaturedBooks();
    
    if (featuredBooks.length === 0) {
      logRequest(request, 'GET', '/api/books/tag', 404);
      return errorResponse('No featured books found', 404);
    }
    
    logRequest(request, 'GET', '/api/books/tag', 200);
    return successResponse({
      count: featuredBooks.length,
      data: featuredBooks
    });
  } catch (error) {
    logRequest(request, 'GET', '/api/books/tag', 500);
    return errorResponse('Error retrieving featured books', 500, error.message);
  }
}