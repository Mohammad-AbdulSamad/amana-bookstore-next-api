// lib/middleware.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Valid API keys (in production, use environment variables!)
const VALID_API_KEYS = ['your-secret-api-key-123', 'admin-key-456'];

/**
 * Authentication middleware - checks for valid API key
 */
export function authenticateRequest(request) {
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message: 'API key is required. Please include x-api-key header.'
      },
      { status: 401 }
    );
  }
  
  if (!VALID_API_KEYS.includes(apiKey)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid API key. Access denied.'
      },
      { status: 403 }
    );
  }
  
  return null; // Authentication successful
}

/**
 * Logging middleware - logs requests to log.txt
 */
export function logRequest(request, method, endpoint, statusCode) {
  try {
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const logEntry = `[${timestamp}] ${method} ${endpoint} - Status: ${statusCode} - User-Agent: ${userAgent}\n`;
    
    // In serverless environments, file system access might be limited
    // Consider using a logging service like Vercel's built-in logs or external service
    if (process.env.NODE_ENV === 'development') {
      const logPath = path.join(process.cwd(), 'log.txt');
      fs.appendFileSync(logPath, logEntry);
    }
    
    // Always log to console (visible in Vercel/deployment logs)
    console.log(logEntry.trim());
  } catch (error) {
    console.error('Logging error:', error);
  }
}

/**
 * Standard success response
 */
export function successResponse(data, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      ...data
    },
    { status: statusCode }
  );
}

/**
 * Standard error response
 */
export function errorResponse(message, statusCode = 500, details = null) {
  const response = {
    success: false,
    message
  };
  
  if (details) {
    response.error = details;
  }
  
  return NextResponse.json(response, { status: statusCode });
}