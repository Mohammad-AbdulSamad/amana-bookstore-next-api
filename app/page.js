// app/page.js
export default function Home() {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://your-project.vercel.app';

  const endpoints = [
    {
      method: 'GET',
      path: '/api/books',
      description: 'Get all books',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/books/1',
      description: 'Get book by ID',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/books/top-rated',
      description: 'Get top 10 rated books',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/books/tag',
      description: 'Get featured books',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/books/date?start=2020-01-01&end=2024-12-31',
      description: 'Get books by date range',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/reviews/1',
      description: 'Get reviews for book ID',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/books',
      description: 'Add a new book',
      auth: true,
    },
    {
      method: 'POST',
      path: '/api/reviews',
      description: 'Add a new review',
      auth: true,
    },
  ];

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        📚 Amana Bookstore API
      </h1>
      <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>
        RESTful API for managing books and reviews
      </p>

      <div style={{ marginBottom: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🔑 Authentication</h2>
        <p style={{ margin: '5px 0' }}>
          POST routes require an API key header:
        </p>
        <code style={{ 
          display: 'block', 
          padding: '10px', 
          background: '#fff', 
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          x-api-key: your-secret-api-key-123
        </code>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📍 API Endpoints</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {endpoints.map((endpoint, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px', 
              padding: '20px',
              background: '#fff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '4px', 
                fontSize: '0.85rem',
                fontWeight: 'bold',
                background: endpoint.method === 'GET' ? '#e3f2fd' : '#fff3e0',
                color: endpoint.method === 'GET' ? '#1976d2' : '#f57c00',
              }}>
                {endpoint.method}
              </span>
              {endpoint.auth && (
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '4px', 
                  fontSize: '0.85rem',
                  background: '#ffebee',
                  color: '#c62828',
                }}>
                  🔒 Auth Required
                </span>
              )}
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <code style={{ 
                fontSize: '1rem',
                color: '#333',
                wordBreak: 'break-all'
              }}>
                {endpoint.path}
              </code>
            </div>
            
            <p style={{ color: '#666', marginBottom: '10px' }}>
              {endpoint.description}
            </p>
            
            {endpoint.method === 'GET' && (
              <a 
                href={endpoint.path}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#4caf50',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  marginTop: '5px'
                }}
              >
                Try it now →
              </a>
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '60px', 
        padding: '30px', 
        background: '#f9f9f9', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>🚀 Quick Start</h2>
        
        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px' }}>
          Using curl:
        </h3>
        <pre style={{ 
          background: '#fff', 
          padding: '15px', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '0.9rem'
        }}>
{`# Get all books
curl ${baseUrl}/api/books

# Add a book (requires auth)
curl -X POST ${baseUrl}/api/books \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: your-secret-api-key-123" \\
  -d '{
    "title": "New Book",
    "author": "Author Name",
    "isbn": "978-1234567890"
  }'`}
        </pre>

        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px' }}>
          Using JavaScript:
        </h3>
        <pre style={{ 
          background: '#fff', 
          padding: '15px', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '0.9rem'
        }}>
{`// GET request
fetch('${baseUrl}/api/books')
  .then(res => res.json())
  .then(data => console.log(data));

// POST request
fetch('${baseUrl}/api/books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-secret-api-key-123'
  },
  body: JSON.stringify({
    title: 'New Book',
    author: 'Author Name',
    isbn: '978-1234567890'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));`}
        </pre>
      </div>

      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '20px', 
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#999'
      }}>
        <p>Built with Next.js • Deployed on Vercel</p>
      </footer>
    </div>
  );
}