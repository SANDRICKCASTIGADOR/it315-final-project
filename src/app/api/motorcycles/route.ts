import { db } from '@/server/db';
import { hardwareSpecs, apiKeys } from '@/server/db/schema';
import { eq, ilike, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';

    let query = db
      .select({
        id: hardwareSpecs.id,
        frontView: hardwareSpecs.frontView,
        sideView: hardwareSpecs.sideView,
        backView: hardwareSpecs.backView,
        description: hardwareSpecs.description,
        monthlyPrice: hardwareSpecs.monthlyPrice,
        fullyPaidPrice: hardwareSpecs.fullyPaidPrice,
        createdAt: hardwareSpecs.createdAt,
        apiKeyName: apiKeys.name,
      })
      .from(hardwareSpecs)
      .leftJoin(apiKeys, eq(hardwareSpecs.apiKeyId, apiKeys.id));

    // Apply search filter
    if (search) {
      query = query.where(
        or(
          ilike(hardwareSpecs.description, `%${search}%`),
          ilike(apiKeys.name, `%${search}%`)
        )
      );
    }

    let motorcycles = await query;

    // Apply sorting
    if (sort === 'price') {
      motorcycles.sort((a, b) => {
        const priceA = parseInt(a.monthlyPrice || '0') || 0;
        const priceB = parseInt(b.monthlyPrice || '0') || 0;
        return priceA - priceB;
      });
    } else if (sort === 'newest') {
      motorcycles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === 'name') {
      motorcycles.sort((a, b) =>
        (a.apiKeyName || '').localeCompare(b.apiKeyName || '')
      );
    }

    // Add source indicator
    const motorcyclesWithSource = motorcycles.map((m) => ({
      ...m,
      source: 'local' as const,
    }));

    return NextResponse.json(motorcyclesWithSource);
  } catch (error) {
    console.error('Error fetching motorcycles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch motorcycles' },
      { status: 500 }
    );
  }
}