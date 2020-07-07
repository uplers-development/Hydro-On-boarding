import React from 'react';
import {site_url} from '../../Apiurl';
import ReactHtmlParser from 'react-html-parser';

const Newsandevents = (props) => {
  return (
    <div className="news-and-events">
		   <h3 className="common-title">News and events</h3>
		   <ul>
		   {props.newsfeeds && props.newsfeeds.map((item,index)=>
		      <li key={index}>
		         <div className="news-img">
		            <img src={item.field_image!=='' ? site_url+item.field_image : require("../../../images/news-feed1.jpg")} alt="News feed 1" />
		         </div>
		         <div className="details-events">
		            <h5>{ReactHtmlParser(item.title)}</h5>
		            {ReactHtmlParser(item.body)}
		         </div>
		      </li>
		      )}
		   </ul>
	</div>
  )
}

export default Newsandevents;