import ReactHtmlParser from 'react-html-parser';
import { Link, Redirect } from "react-router-dom";

export const cosmaticAsset = {
	 cosmatic: {
    	default: {
    		popup: ReactHtmlParser('<div id="modal" className="modal-container"><div className="modal d-flex flex-wrap align-center justify-center"><a href="./rep-contact" className="close" title="Close"><img src="../../images/close-icon-gray.svg" alt="Close icon" /></a><div><img src={require("../../images/round-correct.svg")} alt="Right icon"/><h2>Thank you</h2><p>Your message was submitted successfully</p></div></div></div>'),
    		loader: ReactHtmlParser("<div class='loadingio-spinner-blocks-arsqvui1fdn'><div class='ldio-bv0vlbt7g6w'><div style='left:38px;top:38px;animation-delay:0s'></div><div style='left:80px;top:38px;animation-delay:0.125s'></div><div style='left:122px;top:38px;animation-delay:0.25s'></div><div style='left:38px;top:80px;animation-delay:0.875s'></div><div style='left:122px;top:80px;animation-delay:0.375s'></div><div style='left:38px;top:122px;animation-delay:0.75s'></div><div style='left:80px;top:122px;animation-delay:0.625s'></div><div style='left:122px;top:122px;animation-delay:0.5s'></div></div></div>"),
    	}
    }
}
