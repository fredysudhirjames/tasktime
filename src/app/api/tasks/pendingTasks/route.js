import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Tasks from '@/backend/model/tasks';

export async function GET() {
	await connectDB();
	try {
		// Get tasks where invoiced is false.
		const tasks = await Tasks.find( { invoiced: false } );
		return NextResponse.json( tasks )
	} catch (error) {
		console.error( 'Tasks fetch failed ', error )
		return NextResponse.json( { error: 'Failed to fetch tasks' }, { status: 500 } )
	}
}
