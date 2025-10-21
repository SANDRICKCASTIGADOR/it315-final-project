import { db } from '~/server/db';
import { motorSpecs } from '~/server/db/schema'; // ✅ updated schema import
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('📡 Fetching all motor specs...');

    const result = await db
      .select({
        id: motorSpecs.id,
        frontView: motorSpecs.frontView,
        sideView: motorSpecs.sideView,
        backView: motorSpecs.backView,
        description: motorSpecs.description,
        monthlyPrice: motorSpecs.monthlyPrice,
        fullyPaidPrice: motorSpecs.fullyPaidPrice,
        createdAt: motorSpecs.createdAt,
      })
      .from(motorSpecs);

    console.log('✅ Fetched motor specs:', result.length);

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error fetching motor specs:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch motor specs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
