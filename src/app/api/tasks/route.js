import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Tasks from '@/backend/model/tasks';

export async function GET() {
	await connectDB();
	// Get all tasks, latest first.
	const allTasks = await Tasks.find().sort( { _id: -1 } )
	return NextResponse.json( { tasks: allTasks } )
}

export async function POST(request) {
	// Get the task details.
	const newTaskDetails = await request.json();
	await connectDB();
	// Create new task.
	try {
		const newTask = await Tasks.create( newTaskDetails )
		// Return the newly created task object.
		return NextResponse.json( newTask )
	} catch ( error ) {
		console.error( 'New task creation failed', error )
		return NextResponse.json( { error: 'Error attempting task creation' }, { status: 500 } )
	}
}
