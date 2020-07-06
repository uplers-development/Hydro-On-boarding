import React from 'react';

const Newsandevents = (props) => {
  return (
    <div className="news-and-events">
		   <h3 className="common-title">News and events</h3>
		   <ul>
		      <li>
		         <div className="news-img">
		            <img src={require("../../../images/news-feed1.jpg")} alt="News feed 1" />
		         </div>
		         <div className="details-events">
		            <h5>News feed</h5>
		            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
		         </div>
		      </li>
		      <li>
		         <div className="news-img">
		            <img src={require("../../../images/news-feed2.jpg")} alt="News feed 2" />
		         </div>
		         <div className="details-events">
		            <h5>News feed</h5>
		            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
		         </div>
		      </li>
		   </ul>
	</div>
  )
}

export default Newsandevents;