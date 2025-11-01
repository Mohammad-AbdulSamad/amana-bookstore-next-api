// app/api/books/top-rated/route.js
import { NextResponse } from 'next/server';
import { getTopRatedBooks } from '@/lib/data';
import { logRequest, successResponse, errorResponse } from '@/lib/middleware';

// GET top 10 rated books
export async function GET(request) {
  try {
    const topBooks = getTopRatedBooks(10);
    
    logRequest(request, 'GET', '/api/books/top-rated', 200);
    return successResponse({
      count: topBooks.length,
      data: topBooks
    });
  } catch (error) {
    logRequest(request, 'GET', '/api/books/top-rated', 500);
    return errorResponse('Error retrieving top rated books', 500, error.message);
  }
}