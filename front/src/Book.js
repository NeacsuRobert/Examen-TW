import React from 'react';

function Book(props) {
	return (
		<div className={`card background3`}>
			<p>
                <a href={`#/books/${props.book.id}`}>{props.book.title}</a>
			</p>
		</div>		
	);
}

export default Book