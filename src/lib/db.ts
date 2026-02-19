import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_PATH = path.join(DB_DIR, 'cashmeup.db');

// Ensure db directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb(db);
  }
  return db;
}

function initDb(database: Database.Database): void {
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

export type Member = {
  id?: number;
  first_name: string;
  email: string;
  phone?: string;
  marketing_consent: number;
  created_at?: string;
};

export type PCPLead = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  had_car_finance: string;
  finance_start_year?: string;
  finance_end_year?: string;
  lender?: string;
  consent: number;
  created_at?: string;
  status?: string;
};

export type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};

export function insertMember(member: Omit<Member, 'id' | 'created_at'>): { success: boolean; id?: number; error?: string } {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO members (first_name, email, phone, marketing_consent)
      VALUES (@first_name, @email, @phone, @marketing_consent)
    `);
    const result = stmt.run(member);
    return { success: true, id: result.lastInsertRowid as number };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'This email address is already registered.' };
    }
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export function insertPCPLead(lead: Omit<PCPLead, 'id' | 'created_at' | 'status'>): { success: boolean; id?: number; error?: string } {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO pcp_leads (first_name, last_name, email, phone, had_car_finance, finance_start_year, finance_end_year, lender, consent)
      VALUES (@first_name, @last_name, @email, @phone, @had_car_finance, @finance_start_year, @finance_end_year, @lender, @consent)
    `);
    const result = stmt.run(lead);
    return { success: true, id: result.lastInsertRowid as number };
  } catch (error) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export function insertContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): { success: boolean; id?: number; error?: string } {
  try {
    const database = getDb();
    const stmt = database.prepare(`
      INSERT INTO contact_messages (name, email, message)
      VALUES (@name, @email, @message)
    `);
    const result = stmt.run(message);
    return { success: true, id: result.lastInsertRowid as number };
  } catch (error) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export function getAllMembers(): Member[] {
  const database = getDb();
  return database.prepare('SELECT * FROM members ORDER BY created_at DESC').all() as Member[];
}

export function getAllPCPLeads(): PCPLead[] {
  const database = getDb();
  return database.prepare('SELECT * FROM pcp_leads ORDER BY created_at DESC').all() as PCPLead[];
}

export function getAllContactMessages(): ContactMessage[] {
  const database = getDb();
  return database.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all() as ContactMessage[];
}

export function sanitiseString(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '').substring(0, 1000);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}
