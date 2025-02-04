/**
 * Invoices database schema.
 */

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;

// Auto increment plugin to generate invoice numbers.
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoiceSchema = new Schema( {
	invoiceNo: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	rate: {
		type: Currency,
		required: true,
		min: 10
	},
	totalHours: {
		type: Number,
		required: true,
		default: 0.25,
	},
	amount: {
		type: Currency,
		required: true,
		min: 2.5
	},
	comments: {
		type: String,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task'
		}
	],
	invFile: {
		type: String,
		default: ''
	},
}, {
	timestamps: true
} );

invoiceSchema.plugin( AutoIncrement, {inc_field: 'invoiceNo'} )

const Invoices = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
export default Invoices;
