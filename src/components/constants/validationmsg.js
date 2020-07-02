import ReactHtmlParser from 'react-html-parser';

export const ValidationMsg = {
	 common: {
    	default: {
    		userfield: ReactHtmlParser('<span className="empty-field">Please enter your email.</span>'),
    		passwordfield: ReactHtmlParser('<span className="empty-field">Please enter your password.</span>'),
    		mailTextarea: ReactHtmlParser('<span className="empty-field">Please enter your message.</span>'),
    		firstname:ReactHtmlParser('<span className="empty-field">Please enter your firstname.</span>'),
			lastname:ReactHtmlParser('<span className="empty-field">Please enter your lastname.</span>'),
			email:ReactHtmlParser('<span className="empty-field">Please enter your email.</span>'),
			contactNumber:ReactHtmlParser('<span className="empty-field">Please enter your contactnumber.</span>'),
			Organisation:ReactHtmlParser('<span className="empty-field">Please enter your Organisation.</span>'),
			location:ReactHtmlParser('<span className="empty-field">Please enter your location.</span>'),
            imageformate:ReactHtmlParser('<span className="empty-field">Please enter image fomate from given above.</span>'),
    	}
    }
}
