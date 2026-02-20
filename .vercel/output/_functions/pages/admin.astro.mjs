/* empty css                                 */
import { d as createAstro, c as createComponent, e as renderHead, a as renderTemplate } from '../chunks/astro/server_CI5UcSNn.mjs';
import 'piccolore';
import 'clsx';
import { g as getAllMembers, a as getAllPCPLeads, b as getAllContactMessages } from '../chunks/db_OPPDyvct.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://cashmeup.co.uk");
const prerender = false;
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const adminPassword = "changeme123";
  Astro2.request.headers.get("authorization");
  const url = new URL(Astro2.request.url);
  const queryPassword = url.searchParams.get("pw");
  const isAuthorised = queryPassword === adminPassword;
  if (!isAuthorised) {
    return new Response(
      `<!DOCTYPE html><html><head><title>Admin Login - Cash Me Up</title></head><body style="font-family:sans-serif;max-width:400px;margin:100px auto;padding:20px;">
    <h1 style="color:#1B2A4A;">Cash Me Up Admin</h1>
    <p>Enter admin password to access the dashboard.</p>
    <form method="GET">
      <input type="password" name="pw" placeholder="Admin password" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:4px;" />
      <button type="submit" style="width:100%;padding:10px;background:#2D6B2D;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Login</button>
    </form>
    </body></html>`,
      { status: 401, headers: { "Content-Type": "text/html" } }
    );
  }
  const members = getAllMembers();
  const leads = getAllPCPLeads();
  const messages = getAllContactMessages();
  return renderTemplate`<html lang="en" data-astro-cid-2zp6q64z> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Dashboard — Cash Me Up</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body data-astro-cid-2zp6q64z> <h1 data-astro-cid-2zp6q64z>Cash Me Up Admin Dashboard</h1> <p style="color:#64748B;" data-astro-cid-2zp6q64z>Logged in. <a href="/admin/" data-astro-cid-2zp6q64z>Refresh</a></p> <div class="stats" data-astro-cid-2zp6q64z> <div class="stat" data-astro-cid-2zp6q64z> <div class="stat-num" data-astro-cid-2zp6q64z>${members.length}</div> <div class="stat-label" data-astro-cid-2zp6q64z>Members</div> </div> <div class="stat" data-astro-cid-2zp6q64z> <div class="stat-num" data-astro-cid-2zp6q64z>${leads.length}</div> <div class="stat-label" data-astro-cid-2zp6q64z>PCP Leads</div> </div> <div class="stat" data-astro-cid-2zp6q64z> <div class="stat-num" data-astro-cid-2zp6q64z>${messages.length}</div> <div class="stat-label" data-astro-cid-2zp6q64z>Contact Messages</div> </div> </div> <h2 data-astro-cid-2zp6q64z>PCP Leads (${leads.length})</h2> ${leads.length === 0 ? renderTemplate`<p class="empty" data-astro-cid-2zp6q64z>No PCP leads yet.</p>` : renderTemplate`<div style="overflow-x:auto" data-astro-cid-2zp6q64z> <table data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Phone</th> <th data-astro-cid-2zp6q64z>Had Finance?</th> <th data-astro-cid-2zp6q64z>Start Year</th> <th data-astro-cid-2zp6q64z>Lender</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Submitted</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> ${leads.map((lead) => renderTemplate`<tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>${lead.id}</td> <td data-astro-cid-2zp6q64z>${lead.first_name} ${lead.last_name}</td> <td data-astro-cid-2zp6q64z>${lead.email}</td> <td data-astro-cid-2zp6q64z>${lead.phone}</td> <td data-astro-cid-2zp6q64z>${lead.had_car_finance}</td> <td data-astro-cid-2zp6q64z>${lead.finance_start_year || "—"}</td> <td data-astro-cid-2zp6q64z>${lead.lender || "—"}</td> <td data-astro-cid-2zp6q64z><span class="badge-new" data-astro-cid-2zp6q64z>${lead.status}</span></td> <td data-astro-cid-2zp6q64z>${lead.created_at}</td> </tr>`)} </tbody> </table> </div>`} <h2 data-astro-cid-2zp6q64z>Members (${members.length})</h2> ${members.length === 0 ? renderTemplate`<p class="empty" data-astro-cid-2zp6q64z>No members yet.</p>` : renderTemplate`<div style="overflow-x:auto" data-astro-cid-2zp6q64z> <table data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>ID</th> <th data-astro-cid-2zp6q64z>First Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Phone</th> <th data-astro-cid-2zp6q64z>Marketing Consent</th> <th data-astro-cid-2zp6q64z>Joined</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> ${members.map((member) => renderTemplate`<tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>${member.id}</td> <td data-astro-cid-2zp6q64z>${member.first_name}</td> <td data-astro-cid-2zp6q64z>${member.email}</td> <td data-astro-cid-2zp6q64z>${member.phone || "—"}</td> <td data-astro-cid-2zp6q64z>${member.marketing_consent ? "✓ Yes" : "✗ No"}</td> <td data-astro-cid-2zp6q64z>${member.created_at}</td> </tr>`)} </tbody> </table> </div>`} <h2 data-astro-cid-2zp6q64z>Contact Messages (${messages.length})</h2> ${messages.length === 0 ? renderTemplate`<p class="empty" data-astro-cid-2zp6q64z>No contact messages yet.</p>` : renderTemplate`<div style="overflow-x:auto" data-astro-cid-2zp6q64z> <table data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Message</th> <th data-astro-cid-2zp6q64z>Received</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> ${messages.map((msg) => renderTemplate`<tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>${msg.id}</td> <td data-astro-cid-2zp6q64z>${msg.name}</td> <td data-astro-cid-2zp6q64z>${msg.email}</td> <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" data-astro-cid-2zp6q64z>${msg.message}</td> <td data-astro-cid-2zp6q64z>${msg.created_at}</td> </tr>`)} </tbody> </table> </div>`} </body></html>`;
}, "/workspace/cashmeup/src/pages/admin.astro", void 0);
const $$file = "/workspace/cashmeup/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
