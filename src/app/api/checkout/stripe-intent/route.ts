import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "usd", carName, customerEmail } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // If Stripe is configured with a real secret key
    if (stripe && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency,
        receipt_email: customerEmail,
        description: `Apex Exotics Luxury Rental: ${carName || "Supercar"}`,
        metadata: {
          carName: carName || "Exotic",
          customerEmail: customerEmail || "guest",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
        isLiveStripe: true,
      });
    }

    // Otherwise return simulated Stripe demo response
    return NextResponse.json({
      clientSecret: `demo_secret_${Date.now()}`,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_demo",
      isLiveStripe: false,
      message: "Stripe demo sandbox active. Set STRIPE_SECRET_KEY in .env for live card processing.",
    });
  } catch (error: any) {
    console.error("Stripe Intent Error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize Stripe PaymentIntent" }, { status: 500 });
  }
}
