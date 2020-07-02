import ReactHtmlParser from 'react-html-parser';
import { Link, Redirect } from "react-router-dom";

export const cosmaticAsset = {
	 cosmatic: {
    	default: {
    		popup: ReactHtmlParser('<div id="modal" className="modal-container"><div className="modal d-flex flex-wrap align-center justify-center"><a href="./rep-contact" className="close" title="Close"><img src="../../images/close-icon-gray.svg" alt="Close icon" /></a><div><img src={require("../../images/round-correct.svg")} alt="Right icon"/><h2>Thank you</h2><p>Your message was submitted successfully</p></div></div></div>'),
    	}
    }
}
