// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { addReview } from '@/lib/data';
import { authenticateRequest, logRequest, successResponse, errorResponse } from '@/lib/middleware';

// POST new review (with authentication)
export async function POST(request) {
  try {
    // Check authentication
    const authError = authenticateRequest(request);
    if (authError) {
      logRequest(request, 'POST', '/api/reviews', 401);
      return authError;
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.bookId || !body.author || !body.rating || !body.title) {
      logRequest(request, 'POST', '/api/reviews', 400);
      return errorResponse(
        'Missing required fields: bookId, author, rating, and title are required',
        400
      );
    }
    
    // Validate rating range
    if (body.rating < 1 || body.rating > 5) {
      logRequest(request, 'POST', '/api/reviews', 400);
      return errorResponse('Rating must be between 1 and 5', 400);
    }
    
    // Add the review
    const newReview = addReview(body);
    
    logRequest(request, 'POST', '/api/reviews', 201);
    return successResponse(
      {
        message: 'Review added successfully',
        data: newReview
      },
      201
    );
  } catch (error) {
    logRequest(request, 'POST', '/api/reviews', error.message.includes('not found') ? 404 : 500);
    
    if (error.message.includes('not found')) {
      return errorResponse(error.message, 404);
    }
    
    return errorResponse('Error adding review', 500, error.message);
  }
}