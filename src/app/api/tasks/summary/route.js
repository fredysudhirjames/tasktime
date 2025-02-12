import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Tasks from '@/backend/model/tasks';

export async function GET() {
	await connectDB();
	// Fetch latest 10 tasks, sorted by id.
	const allTasks = await Tasks.find().sort( { _id: -1 } ).limit( 10 )
	return NextResponse.json( { tasks: allTasks } )
}
