/**
 * Task database schema.
 */

import { updateSummary } from '@/utils/updateSummary';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const taskSchema = new Schema( {
	date: {
		type: Date,
		required: true
	},
	title: {
		type: String,
		required: true,
		default: ''
	},
	description: {
		type: String,
		required: true
	},
	hours: {
		type: Number,
		required: true,
		default: 0.25,
	},
	invoiced: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
} );

// Middleware to update summary.
taskSchema.post( 'save', async function() {
	try {
		await updateSummary( this.hours, this.invoiced );
	} catch ( error ) {
		console.error( 'Error updating summary:', error );
	}
});

const Tasks = mongoose.models.Task || mongoose.model( 'Task', taskSchema );

export default Tasks
