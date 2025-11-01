// lib/data.js
import booksData from '../app/data/books.json';
import reviewsData from '../app/data/reviews.json';

// In-memory storage (resets on each serverless function call)
// For persistent storage, you'd need a database
let books = booksData.books || booksData;
let reviews = reviewsData.reviews || reviewsData;

export function getAllBooks() {
  return books;
}

export function getBookById(id) {
  return books.find(b => b.id === id.toString());
}

export function getBooksByDateRange(startDate, endDate) {
  return books.filter(book => {
    const pubDate = new Date(book.datePublished);
    return pubDate >= startDate && pubDate <= endDate;
  });
}

export function getTopRatedBooks(limit = 10) {
  const booksWithScores = books.map(book => ({
    ...book,
    score: book.rating * book.reviewCount
  }));
  
  return booksWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getFeaturedBooks() {
  return books.filter(book => book.featured === true);
}

export function getReviewsByBookId(bookId) {
  return reviews.filter(r => r.bookId === bookId.toString());
}

export function addBook(bookData) {
  // Check if ISBN already exists
  const existingBook = books.find(book => book.isbn === bookData.isbn);
  if (existingBook) {
    throw new Error('A book with this ISBN already exists');
  }
  
  // Generate new ID
  const newId = books.length > 0 
    ? (Math.max(...books.map(b => parseInt(b.id) || 0)) + 1).toString()
    : '1';
  
  const newBook = {
    id: newId,
    title: bookData.title,
    author: bookData.author,
    description: bookData.description || '',
    price: bookData.price || 0,
    image: bookData.image || '/images/default.jpg',
    isbn: bookData.isbn,
    genre: bookData.genre || [],
    tags: bookData.tags || [],
    datePublished: bookData.datePublished || new Date().toISOString().split('T')[0],
    pages: bookData.pages || 0,
    language: bookData.language || 'English',
    publisher: bookData.publisher || '',
    rating: bookData.rating || 0,
    reviewCount: bookData.reviewCount || 0,
    inStock: bookData.inStock !== undefined ? bookData.inStock : true,
    featured: bookData.featured || false
  };
  
  books.push(newBook);
  return newBook;
}

export function addReview(reviewData) {
  // Check if book exists
  const book = books.find(b => b.id === reviewData.bookId.toString());
  if (!book) {
    throw new Error(`Book with id ${reviewData.bookId} not found`);
  }
  
  // Generate new review ID
  const newReviewId = reviews.length > 0 
    ? `review-${Math.max(...reviews.map(r => parseInt(r.id.split('-')[1]) || 0)) + 1}`
    : 'review-1';
  
  const newReview = {
    id: newReviewId,
    bookId: reviewData.bookId.toString(),
    author: reviewData.author,
    rating: parseFloat(reviewData.rating),
    title: reviewData.title,
    comment: reviewData.comment || '',
    timestamp: new Date().toISOString(),
    verified: false
  };
  
  reviews.push(newReview);
  
  // Update book's review count
  book.reviewCount = (book.reviewCount || 0) + 1;
  
  return newReview;
}