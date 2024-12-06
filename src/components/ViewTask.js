export default function ViewTask( { task } ) {
	return(
		<div>
			<h2>Task id: { task._id }</h2>
			<div>
				<label>Date</label>
				<p>{ task.date.substring( 0, 10 ) }</p>
			</div>
			<div>
				<label>Title</label>
				<p>{ task.title }</p>
			</div>
			<div>
				<label>Hours</label>
				<p>{ task.hours }</p>
			</div>

			<div>
				<label>Description</label>
				<div>{ task.description }</div>
			</div>
		</div>
	)
}
