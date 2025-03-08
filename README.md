# Donation Backend Server

This is a simple Express server that handles Stripe checkout sessions for donations.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your Stripe credentials:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_PRICE_ID=your_price_id_here
   PORT=4000
   CLIENT_URL=http://localhost:3000
   SUCCESS_URL=http://localhost:3000/success
   CANCEL_URL=http://localhost:3000/cancel
   ```

3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## Deployment

### Deploying to Heroku

1. Install the Heroku CLI and log in
2. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

3. Set environment variables:
   ```
   heroku config:set STRIPE_SECRET_KEY=sk_test_your_key
   heroku config:set STRIPE_PRICE_ID=your_price_id
   heroku config:set CLIENT_URL=https://your-frontend-domain.com
   heroku config:set SUCCESS_URL=https://your-frontend-domain.com/success
   heroku config:set CANCEL_URL=https://your-frontend-domain.com/cancel
   ```

4. Deploy your code:
   ```
   git add .
   git commit -m "Ready for deployment"
   git push heroku main
   ```

### Deploying to Render, Railway, or Netlify

These platforms offer similar deployment processes with automatic detection of Node.js apps. Follow their documentation for specific deployment steps.

## API Endpoints

### POST /create-checkout-session

Creates a Stripe checkout session for donations.

**Request Body:**