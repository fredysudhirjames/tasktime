/**
 * Summary database schema.
 */

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const summarySchema = new Schema( {
	totalHours: {
		type: Number,
		default: 0,
	},
	pendingHours: {
		type: Number,
		default: 0,
	}
}, {
	timestamps: true
} );

const Summary = mongoose.models.Summary || mongoose.model( 'Summary', summarySchema );

export default Summary;
