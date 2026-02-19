export const prerender = false;

import type { APIRoute } from 'astro';
import { insertContactMessage, sanitiseString, isValidEmail } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const name = sanitiseString(String(body.name || ''));
    const email = sanitiseString(String(body.email || ''));
    const message = sanitiseString(String(body.message || '').substring(0, 2000));

    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter your name.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || message.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a message (at least 10 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = insertContactMessage({ name, email: email.toLowerCase(), message });

    if (result.success) {
      return new Response(
        JSON.stringify({ success: true, message: 'Message received. We\'ll respond within 2 business days.' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
