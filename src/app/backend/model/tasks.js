/**
 * Task database schema.
 */

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

const Tasks = mongoose.models.Task || mongoose.model( 'Task', taskSchema );

export default Tasks
