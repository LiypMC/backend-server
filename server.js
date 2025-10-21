require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize Express
const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:3000'];

if (!allowedOrigins.includes('http://localhost:3000')) {
  allowedOrigins.push('http://localhost:3000');
}

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Donation API is running. Send POST request to /create-checkout-session to create a checkout session.');
});

// Create Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount = 10 } = req.body;
    
    // Ensure the amount is valid
    const quantity = Math.max(1, Math.floor(amount / 10));
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: quantity,
          adjustable_quantity: {
            enabled: false,
          },
        },
      ],
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
      metadata: {
        donationAmount: amount
      }
    });
    
    // Return the session ID to the client
    res.json({ id: session.id });
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'An error occurred while creating the checkout session.',
      details: error.message 
    });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to check if server is running`);
  });
}

// Export for Vercel
module.exports = app; 
