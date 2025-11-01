// app/api/books/[id]/route.js
import { NextResponse } from 'next/server';
import { getBookById } from '../../../../lib/data.js';
import { logRequest, successResponse, errorResponse } from '../../../../lib/middleware.js';

// GET book by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params; // ← AWAIT params
    
    const book = getBookById(id);
    
    if (!book) {
      logRequest(request, 'GET', `/api/books/${id}`, 404);
      return errorResponse(`Book with id ${id} not found`, 404);
    }
    
    logRequest(request, 'GET', `/api/books/${id}`, 200);
    return successResponse({ data: book });
  } catch (error) {
    logRequest(request, 'GET', `/api/books/${await params.id}`, 500);
    return errorResponse('Error retrieving book', 500, error.message);
  }
}