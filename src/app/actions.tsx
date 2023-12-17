'use server'
 
import { cookies } from 'next/headers'
 
export async function setCookies(name: string, data: string) {
  cookies().set(name, data)
}