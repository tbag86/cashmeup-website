export const prerender = false;

import type { APIRoute } from 'astro';
import { insertMember, sanitiseString, isValidEmail } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const firstName = sanitiseString(String(body.first_name || ''));
    const email = sanitiseString(String(body.email || ''));
    const phone = sanitiseString(String(body.phone || ''));
    const marketingConsent = body.marketing_consent === 1 ? 1 : 0;

    if (!firstName || firstName.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter your first name.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = insertMember({
      first_name: firstName,
      email: email.toLowerCase(),
      phone: phone || undefined,
      marketing_consent: marketingConsent,
    });

    if (result.success) {
      return new Response(
        JSON.stringify({ success: true, message: 'Welcome to Cash Me Up!' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Signup API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
