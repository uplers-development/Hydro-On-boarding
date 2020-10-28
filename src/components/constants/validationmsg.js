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

            purchaseProductdate:ReactHtmlParser('<span class="empty-field">Please enter product purchase date.</span>'),
            contractexpirydate:ReactHtmlParser('<span class="empty-field">Please enter contract expire date.</span>'),
            coststate:ReactHtmlParser('<span class="empty-field">Please insert valid cost and only numbers allowed.</span>'),
            itemidstate:ReactHtmlParser('<span class="empty-field">Please insert valid item-id and only numbers allowed.</span>'),


            addproductCheckboxcheckmissing:ReactHtmlParser('<h5><span class="empty-field form-empty">Please select the checkbox of selected values.</span></h5>'),
            addproductfieldnotvalid:ReactHtmlParser('<h5><span class="empty-field form-empty">Please check inserted valid field items there might be something missing.</span></h5>'),
            fieldsEmptyAnnoucementform:ReactHtmlParser('<h5><span class="empty-field form-empty">Please fill the above form details and make sure the announcement is also selected.</span></h5>'),
            EmailAlreadytaken:ReactHtmlParser('<h5><span class="empty-field form-empty">Email id already exists.</span></h5>'),

            resourcetitlefield:ReactHtmlParser('<span class="empty-field">Please enter resource title.</span>'),
            resourcedescriptionfield:ReactHtmlParser('<span class="empty-field">Please enter resource description.</span>'),
            resourceproductfield:ReactHtmlParser('<span class="empty-field">Please enter resource product tags.</span>'),
            resourceduplicateproduct:ReactHtmlParser('<span class="empty-field">Duplicate product tags are not alllowed.</span>'),


            productnamefield:ReactHtmlParser('<span class="empty-field">Please enter product name.</span>'),
            productdescriptionfield:ReactHtmlParser('<span class="empty-field">Please enter description.</span>'),
            productsheettitlefield:ReactHtmlParser('<span class="empty-field">Please enter product sheet title.</span>'),

            currentpasswordfield: ReactHtmlParser('<span class="empty-field">Please enter your valid current password.</span>'),
            newpasswordfield: ReactHtmlParser('<span class="empty-field">Please enter your valid new password.</span>'),
            confirmpasswordfield: ReactHtmlParser('<span class="empty-field">Please enter your valid confirm password.</span>'),
            confirmpasswordmismatch: ReactHtmlParser('<span class="empty-field">New password and confirm password are not same.</span>'),

            announcementbuttonlink: ReactHtmlParser('<span class="empty-field">Please enter valid button link.</span>'),

    	}
    }
}
