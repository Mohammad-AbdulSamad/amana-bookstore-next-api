// app/api/books/route.js
import { NextResponse } from 'next/server';
import { getAllBooks, addBook } from '@/lib/data';
import { authenticateRequest, logRequest, successResponse, errorResponse } from '@/lib/middleware';

// GET all books
export async function GET(request) {
  try {
    logRequest(request, 'GET', '/api/books', 200);
    
    const books = getAllBooks();
    
    return successResponse({
      count: books.length,
      data: books
    });
  } catch (error) {
    logRequest(request, 'GET', '/api/books', 500);
    return errorResponse('Error retrieving books', 500, error.message);
  }
}

// POST new book (with authentication)
export async function POST(request) {
  try {
    // Check authentication
    const authError = authenticateRequest(request);
    if (authError) {
      logRequest(request, 'POST', '/api/books', 401);
      return authError;
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.author || !body.isbn) {
      logRequest(request, 'POST', '/api/books', 400);
      return errorResponse(
        'Missing required fields: title, author, and isbn are required',
        400
      );
    }
    
    // Add the book
    const newBook = addBook(body);
    
    logRequest(request, 'POST', '/api/books', 201);
    return successResponse(
      {
        message: 'Book added successfully',
        data: newBook
      },
      201
    );
  } catch (error) {
    logRequest(request, 'POST', '/api/books', error.message.includes('ISBN') ? 409 : 500);
    
    if (error.message.includes('ISBN')) {
      return errorResponse(error.message, 409);
    }
    
    return errorResponse('Error adding book', 500, error.message);
  }
}