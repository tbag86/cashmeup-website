import { s as sanitiseString, i as isValidEmail, d as isValidPhone, e as insertPCPLead } from '../../chunks/db_OPPDyvct.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const firstName = sanitiseString(String(body.first_name || ""));
    const lastName = sanitiseString(String(body.last_name || ""));
    const email = sanitiseString(String(body.email || ""));
    const phone = sanitiseString(String(body.phone || ""));
    const hadCarFinance = sanitiseString(String(body.had_car_finance || ""));
    const financeStartYear = sanitiseString(String(body.finance_start_year || ""));
    const lender = sanitiseString(String(body.lender || ""));
    const consent = body.consent === 1 ? 1 : 0;
    if (!firstName || firstName.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter your first name." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!lastName || lastName.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter your last name." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!phone || !isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid phone number." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!["yes", "no", "not-sure"].includes(hadCarFinance)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please indicate whether you had car finance." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!consent) {
      return new Response(
        JSON.stringify({ success: false, error: "You must provide consent to proceed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const result = insertPCPLead({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone,
      had_car_finance: hadCarFinance,
      finance_start_year: financeStartYear || void 0,
      finance_end_year: void 0,
      lender: lender || void 0,
      consent
    });
    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Your PCP claim enquiry has been received. We'll be in touch within 24 hours."
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("PCP Lead API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
