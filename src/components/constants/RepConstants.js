import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";


export const RepLogoutPopup={
	default:{
		loader: ReactHtmlParser("<div class='loadingio-spinner-blocks-arsqvui1fdn'><div class='ldio-bv0vlbt7g6w'><div style='left:38px;top:38px;animation-delay:0s'></div><div style='left:80px;top:38px;animation-delay:0.125s'></div><div style='left:122px;top:38px;animation-delay:0.25s'></div><div style='left:38px;top:80px;animation-delay:0.875s'></div><div style='left:122px;top:80px;animation-delay:0.375s'></div><div style='left:38px;top:122px;animation-delay:0.75s'></div><div style='left:80px;top:122px;animation-delay:0.625s'></div><div style='left:122px;top:122px;animation-delay:0.5s'></div></div></div>"),
		loginErrorMsg:ReactHtmlParser('<h5><span class="empty-field">Please provide valid credentials.</span></h5>'),

		noDatafound:ReactHtmlParser('<h3 className="no-data-display">No Data Found.</h3>'),
		
	}
}