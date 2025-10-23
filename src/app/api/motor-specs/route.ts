import { db } from '~/server/db';
import { motorSpecs } from '~/server/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await db
      .select({
        id: motorSpecs.id,
        motorName: motorSpecs.motorName,
        frontView: motorSpecs.frontView,
        sideView: motorSpecs.sideView,
        backView: motorSpecs.backView,
        description: motorSpecs.description,
        monthlyPrice: motorSpecs.monthlyPrice,
        fullyPaidPrice: motorSpecs.fullyPaidPrice,
        createdAt: motorSpecs.createdAt,
      })
      .from(motorSpecs);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}