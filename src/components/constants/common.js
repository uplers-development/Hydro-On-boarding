import ReactHtmlParser from 'react-html-parser';
import { Link, Redirect } from "react-router-dom";

export const cosmaticAsset = {
	 cosmatic: {
    	default: {
    		popup: ReactHtmlParser('<div id="modal" class="modal-container"><div class="modal d-flex flex-wrap align-center justify-center"><Link to={./stores/Repcontact} class="close" title="Close"><img src={require("../../images/close-icon-gray.svg")} alt="Close icon" /></Link><div><img src={require("../../images/round-correct.svg")} alt="Right icon"/><h2>Thank you</h2><p>Your message was submitted successfully</p></div></div></div>'),
    	}
    }
}
