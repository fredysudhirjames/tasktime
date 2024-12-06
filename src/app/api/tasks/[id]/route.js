import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Tasks from '@/backend/model/tasks';
import { updateSummary } from '@/utils/updateSummary';
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
		// Fetch the original task for comparison, get only hours and invoiced values.
		const originalTask = await Tasks.findById( taskId, 'hours invoiced' );
		if ( !originalTask ) {
			return NextResponse.json( { success: false, message: 'No task found to update!' } );
		}

		const updatedTask = await Tasks.findByIdAndUpdate( taskId, {
			$set: updatedData
		}, { new: true } );
		
		// Update the Summary
		const hoursDifference = updatedData.hours - originalTask.hours;

		// The Task update function do not have the option to change the invoiced status, still added the code as an extra step.
		const invoicedChange = updatedData.invoiced !== originalTask.invoiced;

		if ( hoursDifference || invoicedChange ) {
			await updateSummary( hoursDifference, updatedData.invoiced );
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
	// Reduce the hours by making the hours a negative value.
	await updateSummary( -deletedTask.hours, deletedTask.invoiced );
	return NextResponse.json( { success: true, message: 'Task deleted', deletedTask } )
}
