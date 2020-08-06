import ReactHtmlParser from 'react-html-parser';

export const ValidationMsg = {
	 common: {
    	default: {
    		userfield: ReactHtmlParser('<span class="empty-field">Please enter your valid email.</span>'),
    		passwordfield: ReactHtmlParser('<span class="empty-field">Please enter your valid password.</span>'),
    		mailTextarea: ReactHtmlParser('<span class="empty-field">Please enter your message.</span>'),
    		firstname:ReactHtmlParser('<span class="empty-field">Please enter your valid firstname.</span>'),
			lastname:ReactHtmlParser('<span class="empty-field">Please enter your valid lastname.</span>'),
			email:ReactHtmlParser('<span class="empty-field">Please enter your valid email.</span>'),
			contactNumber:ReactHtmlParser('<span class="empty-field">Please enter your valid contactnumber.</span>'),
			Organisation:ReactHtmlParser('<span class="empty-field">Please enter your valid Organisation.</span>'),
			location:ReactHtmlParser('<span class="empty-field">Please enter your valid location.</span>'),
            imageformate:ReactHtmlParser('<span class="empty-field">Please enter format from above list.</span>'),
            checkdocumentempty:ReactHtmlParser('<span class="empty-field">Please upload document.</span>'),
            checkimageempty:ReactHtmlParser('<span class="empty-field">Please upload image.</span>'),

            surnamefield:ReactHtmlParser('<span class="empty-field">Please enter your valid surname.</span>'),
            company:ReactHtmlParser('<span class="empty-field">Please enter your valid company name.</span>'),
            role:ReactHtmlParser('<span class="empty-field">Please enter your valid role.</span>'),
            usernotificationcheckbox:ReactHtmlParser('<span class="empty-field">Please select the above checkbox.</span>'),

            purchaseProductdate:ReactHtmlParser('<span class="empty-field">Please insert valid purchase date and use formate(YYYY-MM-DD).</span>'),
            contractexpirydate:ReactHtmlParser('<span class="empty-field">Please insert valid contract expiry date and use formate(YYYY-MM-DD).</span>'),
            coststate:ReactHtmlParser('<span class="empty-field">Please insert valid cost and only numbers allowed.</span>'),
            itemidstate:ReactHtmlParser('<span class="empty-field">Please insert valid item-id and only numbers allowed.</span>'),


            addproductCheckboxcheckmissing:ReactHtmlParser('<span class="empty-field">Please select the checkbox of selected values.</span>'),
            addproductfieldnotvalid:ReactHtmlParser('<span class="empty-field">Please check inserted valid field items there might be something missing.</span>'),
            fieldsEmptyAnnoucementform:ReactHtmlParser('<span class="empty-field">Please fill the above form details.</span>'),

            resourcetitlefield:ReactHtmlParser('<span class="empty-field">Please enter resource title.</span>'),
            resourcedescriptionfield:ReactHtmlParser('<span class="empty-field">Please enter resource description.</span>'),
            resourceproductfield:ReactHtmlParser('<span class="empty-field">Please enter resource product tags.</span>'),


            productnamefield:ReactHtmlParser('<span class="empty-field">Please enter product name.</span>'),
            productdescriptionfield:ReactHtmlParser('<span class="empty-field">Please enter description.</span>'),
            productsheettitlefield:ReactHtmlParser('<span class="empty-field">Please enter product sheet title.</span>'),
    	}
    }
}
