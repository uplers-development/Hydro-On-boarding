import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import CommonBackground from './../images/common-bg.jpg';
import Apiurl,{site_url} from './Apiurl'; 


class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state={
			title:null,
			bodyparagraph:null,
			field_button_text:null,
			field_button_uri:null,
			middleItem:[]
		}
	}


	componentDidMount(){
		this.welcomeMainBlock();
		this.welcomeThreeBlock();
	}

	welcomeMainBlock=()=>{
		fetch(Apiurl.Welcomeblockmain.url,{
    			headers: {
                	"Content-Type" : "application/json",
                },
                method:Apiurl.Welcomeblockmain.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({title:data.title[0].value,bodyparagraph:data.body[0].value,field_button_text:data.field_button_text[0].value});
    	})	
	}


	welcomeThreeBlock=()=>{
		fetch(Apiurl.WelcomeThreeblock.url,{
    			headers: {
                	"Content-Type" : "application/json",
                },
                method:Apiurl.WelcomeThreeblock.method,
    	}).then(res=>{
    		return res.json()
    	}).then(data=>{	
    		console.log(data);
    		this.setState({middleItem:data});
    	})	
	}

	render() {
		return (
			<div><section className="main-wrapper">
		<div className="d-flex flex-wrap main-block black-overlay-transparent bg-cover" style={{backgroundImage:`url(${CommonBackground})`}}>
			
			{/*<!--Intro new user popup-->
						*/}			
			<div className="intro-new-user-popup">
				<a href="#" className="close" title="Close icon"><img className="svg" src={require("./../images/close-icon-gray.svg")} alt="close icon"/></a>
				<h1>{this.state.title}</h1>
				{ReactHtmlParser(this.state.bodyparagraph)}
				<div className="list welcome-slider d-flex flex-wrap">
					{this.state.middleItem.length && this.state.middleItem.map((item,index)=>
							<div className="items"  key={index}><div>
								<h2>{item.field_block_title}</h2>
								<div className="image-block">
									<div className="back-transp-img">
										<img className="svg" src={require("./../images/wlcome-item-bg.svg")} alt="welcome ovelay"/>
									</div>
									<img src={site_url+item.field_block_image} alt={item.field_block_title} />
								</div>
								<p>{item.field_block_description}</p>
							</div></div>		
					)}

					
				</div>
				<div className="btn-block">
					<Link to={"/Dashboard"} className="btn common-btn-blue">
						<span>{this.state.field_button_text}</span></Link>
				</div>
			</div>{/*<!--Intro new user popup End-->*/}

		</div>
	</section></div>
		);
	}
}


export default Welcome