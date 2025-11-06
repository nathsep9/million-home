import { NextResponse } from 'next/server';
import properties from '@/app/mocks/data/ properties.mock.json';
import type { PropertyDTO, PropertiesResponse } from '@/app/interface/types/property';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = properties as PropertyDTO[];
  const result: PropertiesResponse = { items, total: items.length };
  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
}
