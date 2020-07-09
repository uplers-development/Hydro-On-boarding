import React from 'react';

const Repclientsorting = (props) => {
  return (
    <div className="d-flex flex-wrap sort-by">
				<div className="sort-selected d-flex flex-wrap align-center">
					<h2>Sort by</h2>
				</div>
				<div className="drop-down-menu">
					<ul>
						<li><a href="#" title="Purchase date newest">Purchase date newest</a></li>
						<li><a href="#" title="Purchase date oldest">Purchase date oldest</a></li>
						<li><a href="#" title="A-Z">A-Z</a></li>
					</ul>
				</div>
	</div>
  )
}

export default Repclientsorting;