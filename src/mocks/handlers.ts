import { http, HttpResponse } from 'msw';
import properties from '@/app/mocks/data/ properties.mock.json';
import type { PropertiesResponse, PropertyDTO } from '@/app/interface/types/property';

const BASE_URL = '/api';

export const handlers = [
  http.get(`${BASE_URL}/properties`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name')?.toLowerCase() || '';
    const address = url.searchParams.get('address')?.toLowerCase() || '';
    const minPrice = Number(url.searchParams.get('minPrice') || '0');
    const maxPrice = Number(url.searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER);

    const filtered = (properties as PropertyDTO[]).filter((p) => {
      const matchesName = p.name.toLowerCase().includes(name);
      const matchesAddress = p.address.toLowerCase().includes(address);
      const matchesMin = p.price >= minPrice;
      const matchesMax = p.price <= maxPrice;
      return matchesName && matchesAddress && matchesMin && matchesMax;
    });

    const result: PropertiesResponse = { items: filtered, total: filtered.length };
    return HttpResponse.json(result);
  }),

  http.get(`${BASE_URL}/properties/:id`, ({ params }) => {
    const { id } = params as { id: string };
    const item = (properties as PropertyDTO[]).find((p) => p.id === id);
    if (!item) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];
