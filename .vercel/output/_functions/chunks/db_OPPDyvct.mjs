import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), "db");
const DB_PATH = path.join(DB_DIR, "cashmeup.db");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
let db;
function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initDb(db);
  }
  return db;
}
function initDb(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      marketing_consent INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pcp_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      had_car_finance TEXT NOT NULL,
      finance_start_year TEXT,
      finance_end_year TEXT,
      lender TEXT,
      consent INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
    CREATE INDEX IF NOT EXISTS idx_pcp_leads_email ON pcp_leads(email);
    CREATE INDEX IF NOT EXISTS idx_pcp_leads_status ON pcp_leads(status);
  `);
}
function insertMember(member) {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO members (first_name, email, phone, marketing_consent)
      VALUES (@first_name, @email, @phone, @marketing_consent)
    `);
    const result = stmt.run(member);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    const err = error;
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { success: false, error: "This email address is already registered." };
    }
    return { success: false, error: "An error occurred. Please try again." };
  }
}
function insertPCPLead(lead) {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO pcp_leads (first_name, last_name, email, phone, had_car_finance, finance_start_year, finance_end_year, lender, consent)
      VALUES (@first_name, @last_name, @email, @phone, @had_car_finance, @finance_start_year, @finance_end_year, @lender, @consent)
    `);
    const result = stmt.run(lead);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: "An error occurred. Please try again." };
  }
}
function insertContactMessage(message) {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO contact_messages (name, email, message)
      VALUES (@name, @email, @message)
    `);
    const result = stmt.run(message);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: "An error occurred. Please try again." };
  }
}
function getAllMembers() {
  const database = getDb();
  return database.prepare("SELECT * FROM members ORDER BY created_at DESC").all();
}
function getAllPCPLeads() {
  const database = getDb();
  return database.prepare("SELECT * FROM pcp_leads ORDER BY created_at DESC").all();
}
function getAllContactMessages() {
  const database = getDb();
  return database.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all();
}
function sanitiseString(input) {
  return input.trim().replace(/<[^>]*>/g, "").substring(0, 1e3);
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

export { getAllPCPLeads as a, getAllContactMessages as b, insertContactMessage as c, isValidPhone as d, insertPCPLead as e, insertMember as f, getAllMembers as g, isValidEmail as i, sanitiseString as s };
