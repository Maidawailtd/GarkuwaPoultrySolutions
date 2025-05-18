// This is a simple entry point for running the application directly with Node
// It redirects to the appropriate entry point based on environment

if (process.env.NODE_ENV === 'production') {
  // In production, use the built files
  import('./dist/index.js').catch(err => {
    console.error('Error importing production module:', err);
  });
} else {
  // In development, use tsx to run TypeScript files directly
  console.log('Please use "npm run dev" to start the application in development mode');
  console.log('Or use "npm run build" and then "npm run start" for production mode');
  process.exit(1);
}