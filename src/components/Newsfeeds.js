import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from './assets/Sidebar';
import UserProfile from './assets/UserProfile';

class Newsfeeds extends Component {
	constructor(props) {
		super(props);
		this.state={}
	}

	render() {
		return (
			<div>
				<section className="main-wrapper">
					<div className="d-flex flex-wrap main-block">
					<Sidebar/>
					<div className="d-flex flex-wrap right-content-part">
					<UserProfile/>
					<div className="bottom-content-block">

					{/*<!--News feed main blok start-->*/}
					<div className="d-flex flex-wrap news-main">

						{/*<!--News feed left blok start-->*/}
						<div className="news-feed-left">

							<div className="news-title sky-blue-bg">
								<img src={require("./../images/bell-icon-logo.svg")} alt="Bell logo"/>
								<h3>Notification title</h3>
								<div className="time-date">Today at 8:30am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
								<img className="svg" src={require("./../images/login-screen-pattern-white-r.svg")} alt="login screen pattern"/>
							</div>

							{/*<!--Date wise block start-->*/}
							<div className="news-date">
								<h4>Friday, 1st May</h4>
							</div>
							<div className="datewise-common-block white-bg-boxshadow">

								<div className="top-title">
									<img src={require("./../images/warning-logo.svg")} alt="warning-logo"/>
									<h4><span>WARNING</span> Flooding in the West Midlands</h4>
								</div>
								<div className="time-date">Today at 8:30am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								<div className="btn-block">
									<button className="btn common-btn-white" type="submit"><span>Find Out More</span></button>
								</div>
							</div>
							<div className="white-text datewise-common-block d-flex flex-wrap padding-0">
								<div className="left-content cobalt-blue-bg">
									<div className="top-title">
										<img src={require("./../images/new-product-launch.svg")}/>
										<h4>New product launch</h4>
									</div>
									<div className="time-date">Today at 9.03am</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
									<div className="btn-block">

										<button className="btn btn-cobalt-blue" type="submit"><span>SEE MORE</span></button>

									</div>
								</div>
								<div className="image-block bg-cover" style={{backgroundImage: "url(./../images/hydro-dryscreen.jpg)"}}></div>
							</div>
							{/*<!--Date wise details box end-->*/}

							{/*<!--Date wise block start-->*/}
							<div className="news-date">
								<h4>Monday, 4th May</h4>
							</div>

							<div className="datewise-common-block white-bg-boxshadow">

								<div className="top-title">
									<img src={""} alt="issue-logo"/>
									<h4>Issues</h4>
								</div>
								<div className="time-date">Today at 8:30am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								<div className="btn-block">
									<button className="btn common-btn-white" type="submit"><span>Find Out More</span></button>
								</div>
							</div>
							<div className="datewise-common-block white-bg-boxshadow">

								<div className="top-title">
									<img src={require("./../images/warning-logo.svg")} alt="warning-logo"/>
									<h4><span>WARNING</span> Flooding in the West Midlands</h4>
								</div>
								<div className="time-date">Today at 8:30am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								<div className="btn-block">
									<button className="btn common-btn-white" type="submit"><span>Find Out More</span></button>
								</div>
							</div>
							{/*<!--Date wise block end-->*/}

							{/*<!--Date wise block start-->*/}
							<div className="news-date">
								<h4>Tuesday, 5th May</h4>
							</div>

							<div className="datewise-common-block white-bg-boxshadow">

								<div className="top-title">
									<img src={""} alt="issue-logo"/>
									<h4>Issues</h4>
								</div>
								<div className="time-date">Today at 8:30am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								<div className="btn-block">
									<button className="btn common-btn-white" type="submit"><span>Find Out More</span></button>
								</div>
							</div>

							<div className="datewise-common-block white-text teal-color-bg">

								<div className="top-title">
									<img src={require("./../images/setting-logo.svg")} alt="setting-logo"/>
									<h4>Update to T&Cs</h4>
								</div>
								<div className="time-date">10:00 am</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</div>
							{/*<!--Date wise block end-->*/}




						</div>
						{/*<!--News feed left blok end-->*/}

						{/*<!--News feed right blok start-->*/}
						<div className="news-feed-right">
							<div className="recently-viewed">
								<h4>Recently viewed</h4>
								<ul>
									<li><a href="#" title="Lorem ipsum dolor">Lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
									<li><a href="#" title="Lorem ipsum dolor">Lorem ipsum dolor sit amet…</a></li>
									<li><a href="#" title="Lorem ipsum dolor">Lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
									<li><a href="#" title="Lorem ipsum dolor">Lorem ipsum dolor sit amet, consectetur adipiscing elit…</a></li>
								</ul>
							</div>
						</div>
						{/*<!--News feed right blok end-->*/}

					</div>
					{/*<!--News feed main blok end-->*/}

				</div>
				{/*<!--Main content bottom block end-->*/}

			</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Newsfeeds;