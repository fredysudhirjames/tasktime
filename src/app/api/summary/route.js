import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Summary from '@/backend/model/summary';

export async function GET() {
	await connectDB();
	try {
		const tasksSummary = await Summary.findOne()
		return NextResponse.json( { summary: tasksSummary } )
	} catch ( error ) {
		console.error( 'Summary fetch failed ', error )
		return NextResponse.json( { error: 'Failed to fetch summary' }, { status: 500 } )
	}
}
