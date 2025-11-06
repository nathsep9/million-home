import { NextRequest, NextResponse } from 'next/server';
import properties from '@/app/mocks/data/ properties.mock.json';
import type { PropertyDTO } from '@/app/interface/types/property';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const params = await ctx.params;
  const id = params.id;
  const item = (properties as PropertyDTO[]).find((p) => p.id === id);
  if (!item) {
    return NextResponse.json({ message: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }
  return NextResponse.json(item, { headers: { 'Cache-Control': 'no-store' } });
}
