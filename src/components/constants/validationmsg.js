import ReactHtmlParser from 'react-html-parser';

export const ValidationMsg = {
	 common: {
    	default: {
    		userfield: ReactHtmlParser('<span class="empty-field">Please enter your username.</span>'),
    		passwordfield: ReactHtmlParser('<span class="empty-field">Please enter your password.</span>'),

    	}
    }
}
