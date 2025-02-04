import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Invoices from '@/backend/model/invoices';
import mongoose from 'mongoose';
import Tasks from '@/backend/model/tasks';

export async function GET() {
	await connectDB();
	// Get all invoices.
	const allInvoices = await Invoices.find().sort( {_id: -1 });
	return NextResponse.json( allInvoices );
}

export async function POST( request ) {
	const invoiceData = await request.json();
	const amount = invoiceData.totalHours * invoiceData.rate;
	invoiceData.amount = amount * 100; // Multiply by 100 since the field is stored as mongoose-currency.
	await connectDB();

	// Using session to execute multiple operations.
	const session = await mongoose.startSession();
	session.startTransaction();

	// Generate invoice.
	try {
		const newInvoice = await Invoices.create( [ invoiceData ], { session } );
		// Update tasks within the transaction.
		// if ( invoiceData.tasks && invoiceData.tasks.length > 0 ) {
		// 	await Tasks.updateMany(
		// 		{ _id: { $in: invoiceData.tasks } },
		// 		{ $set: { invoiced: true } },
		// 		{ session }
		// 	);
		// }

		// Commit transaction if all succeeds.
		await session.commitTransaction();
		session.endSession();

		return NextResponse.json( newInvoice );
	} catch ( error ) {
		// Rollback if any error occurs.
		await session.abortTransaction();
		session.endSession();

		console.error( 'Error creating new Invoice', error )
		return NextResponse.json( { error: 'Error attempting invoice creation' }, { status: 500 } )
	}
}
