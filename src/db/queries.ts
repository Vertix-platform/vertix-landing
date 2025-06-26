import { sql } from './config';

export interface User {
  id: number;
  email: string;
  name: string;
  country: string;
  created_at: Date;
  updated_at: Date;
}

export async function createUser(email: string, name: string, country: string): Promise<User> {
  const [user] = await sql`
    INSERT INTO users (email, name, country)
    VALUES (${email}, ${name}, ${country})
    RETURNING *
  ` as User[];
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  ` as User[];
  return user || null;
}

export async function getAllUsers(): Promise<User[]> {
  return await sql`
    SELECT * FROM users ORDER BY created_at DESC
  ` as User[];
}

export async function getUserCount(): Promise<number> {
  const [result] = await sql`
    SELECT COUNT(*) as count FROM users
  ` as { count: number }[];
  return result.count;
} 