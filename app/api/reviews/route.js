// app/api/reviews/[id]/route.js
import { NextResponse } from 'next/server';
import { getReviewsByBookId } from '@/lib/data';
import { logRequest, successResponse, errorResponse } from '@/lib/middleware';

// GET reviews by book ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const bookReviews = getReviewsByBookId(id);
    
    if (bookReviews.length === 0) {
      logRequest(request, 'GET', `/api/reviews/${id}`, 404);
      return errorResponse(`No reviews found for book with id ${id}`, 404);
    }
    
    logRequest(request, 'GET', `/api/reviews/${id}`, 200);
    return successResponse({
      count: bookReviews.length,
      data: bookReviews
    });
  } catch (error) {
    logRequest(request, 'GET', `/api/reviews/${params.id}`, 500);
    return errorResponse('Error retrieving reviews', 500, error.message);
  }
}