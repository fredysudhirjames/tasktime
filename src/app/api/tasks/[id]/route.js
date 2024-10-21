import { NextResponse } from 'next/server';
import connectDB from '@/app/backend/mongodb';
import Tasks from '@/app/backend/model/tasks';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
	const taskId = params.id;
	if ( ! mongoose.Types.ObjectId.isValid( taskId ) ) {
		return NextResponse.json( { success: false, message: 'Invalid Task ID' } )
	}
	await connectDB();
	// Get task data by ID.
	const singleTask = await Tasks.findById(taskId)
	return NextResponse.json( { success: true, task: singleTask } )
}

export async function POST( request, { params } ) {
	const taskId = params.id;
	if ( !mongoose.Types.ObjectId.isValid( taskId ) ) {
		return NextResponse.json( { success: false, message: 'Invalid Task ID' } )
	}
	// Get updated task details.
	const updatedData = await request.json();
	await connectDB();
	// Update task.
	try {
		const updatedTask = await Tasks.findByIdAndUpdate( taskId, {
			$set: updatedData
		}, { new: true } );

		if ( ! updatedTask ) {
			return NextResponse.json( { success: false, message: 'No task found to update!' } )
		}
		
		// Return the updated task in the response.
		return NextResponse.json( { success: true, updatedTask } )
	} catch ( error ) {
		console.error( 'Task updation failed', error )
		return NextResponse.json( { error: 'Error attempting task update' }, { status: 500 } )
	}
}

export async function DELETE(request, {params}) {
	const taskId = params.id;
	if ( !mongoose.Types.ObjectId.isValid( taskId ) ) {
		return NextResponse.json( { success: false, message: 'Invalid Task ID' } )
	}
	await connectDB();
	const deletedTask = await Tasks.findByIdAndDelete(taskId);
	return NextResponse.json( { success: true, message: 'Task deleted', deletedTask } )
}
