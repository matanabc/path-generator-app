import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Alert } from 'react-bootstrap';
import React from 'react';

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'white',
	padding: '10px 8px 0 8px',
	overflowX: 'hidden',
	borderRadius: '5px',
	overflowY: 'auto',
	height: '250px',
});

const DragAndDropList = ({ style, title, id, items }) => (
	<div style={{ ...style, width: '50%', padding: '10px' }}>
		<h5>{title}</h5>
		<Droppable droppableId={id}>
			{(provided, snapshot) => {
				return (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{items.map((item, index) => (
							<Draggable key={item} draggableId={item} index={index}>
								{(provided, snapshot) => (
									<Alert
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										variant={snapshot.isDragging ? 'success' : 'primary'}
									>
										{item}
									</Alert>
								)}
							</Draggable>
						))}
						{items.length === 0 && <h6>list is empty</h6>}
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	</div>
);

export default DragAndDropList;
