import { NextResponse } from 'next/server';
import connectDB from '@/backend/mongodb';
import Invoices from '@/backend/model/invoices';
import mongoose from 'mongoose';
import Tasks from '@/backend/model/tasks';
import path from 'path';
import fs from 'fs';
import mustache from 'mustache';
import puppeteer from 'puppeteer';
import { clearLine } from 'readline';

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
		const templatePath = path.join( process.cwd(), 'src', 'templates', 'invoiceTemplate.mustache' );
		const templateContent = fs.readFileSync( templatePath, 'utf-8' );

		// Data for the template
		const invoiceDetails = {
			invoiceNo: newInvoice[ 0 ].invoiceNo,
			date: newInvoice[ 0 ].date,
			totalHours: newInvoice[ 0 ].totalHours,
			rate: newInvoice[ 0 ].rate,
			amount: ( newInvoice[ 0 ].amount / 100 ).toFixed( 2 ),
		};

		// Render the template with Mustache
		const renderedHTML = mustache.render( templateContent, invoiceDetails );

		// Generate the PDF
		const pdfFilename = `invoice-${ newInvoice[ 0 ].invoiceNo }.pdf`;
		const pdfPath = path.join( process.cwd(), 'public', 'invoices', pdfFilename );

		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent( renderedHTML );
		await page.pdf( { path: pdfPath, format: 'A4' } );
		await browser.close();

		// Update the invoice with the PDF filename
		const invoiceFile = await Invoices.findByIdAndUpdate( newInvoice[ 0 ]._id, { invFile: pdfFilename }, { new: true, session } );

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
