import React, { Component } from 'react';
import { Input, Label, Nav, NavItem, NavLink, Progress, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMode, setMouseTrack } from "actions/setting";

class Aside extends Component {
	constructor (props) {
		super (props);

		this.toggle = this.toggle.bind (this);
		this.state = {
			activeTab : '1',
			cameraCenter : false,
		};
	}

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState ({
				activeTab : tab,
			});
		}
	};
	componentDidMount = () => {
		//this.props.setMouseTrack (true)
	};

	render () {
		let {mode, mouseTrack} = this.props;
		return (
			<aside className="aside-menu">
				<Nav tabs>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '1'}) }
						         onClick={ () => { this.toggle ('1'); } }>
							<i className="icon-list"/>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '2'}) }
						         onClick={ () => { this.toggle ('2'); } }>
							<i className="icon-speech"/>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={ classnames ({active : this.state.activeTab === '3'}) }
						         onClick={ () => { this.toggle ('3'); } }>
							<i className="icon-settings"/>
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent className={ 'd-flex' } activeTab={ this.state.activeTab }>
					<TabPane tabId="1" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<h6 className={ 'translatex-40 text-right' }>SETTINGS</h6>
						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-4 ">
								<small><b>MODE </b></small>
								<span className={ 'badge' +
								' badge-info' }> { mode }</span>
								<Label for='mode-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='mode-button' type="checkbox" className="switch-input"
									       checked={ mode === '3D' }
									       onChange={ () => this.props.setMode (this.props.mode === '3D' ? '2D' : '3D') }
									/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									2D/3D switch, 3D mode is disabled on mobile device
								</small>
							</div>
						</div>
						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-3">
								<small><b>CURSOR TRACK </b></small>
								<Label for='cursor-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='cursor-button' type="checkbox" className="switch-input"
									       checked={ this.props.mouseTrack === true }
									       onChange={ () => {
										       this.props.setMouseTrack (!this.props.mouseTrack);
										       this.setState ({cameraCenter : false});
									       } }
									/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									Switch for mouse tracking function, it will change user view based on cursor
									position, I implemented from my old website and tweeked a little for performance.
								</small>
							</div>
						</div>

						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-3">
								<small><b>CAMERA CENTER</b></small>
								<Label for='cameraCenter-button'
								       className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input id='cameraCenter-button' type="checkbox" className="switch-input"
									       checked={ this.state.cameraCenter }
									       onChange={ () => {
										       this.props.resetCamera ();
										       this.setState ({cameraCenter : !this.state.cameraCenter});
									       } }/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
							<div>
								<small className="text-muted">
									To reset camera position and disable cursor tracking function
								</small>
							</div>
						</div>

						<div className="aside-options mode3D-blur">
							<div className="clearfix mt-3">
								<small><b>Option 4</b></small>
								<Label className="switch switch-text switch-pill switch-success switch-sm float-right">
									<Input type="checkbox" className="switch-input" defaultChecked/>
									<span className="switch-label" data-on="On" data-off="Off"/>
									<span className="switch-handle"/>
								</Label>
							</div>
						</div>
						<hr/>
						<h6 className={ 'translatex-40 text-right' }>SERVER UTILIZATION</h6>

						<div className="text-uppercase mb-1 mt-4">
							<small><b>CPU Usage</b></small>
						</div>
						<Progress className="progress-xs" color="info" value="25"/>
						<small className="text-muted">348 Processes. 1/4 Cores.</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>Memory Usage</b></small>
						</div>
						<Progress className="progress-xs" color="warning" value="70"/>
						<small className="text-muted">11444GB/16384MB</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>SSD 1 Usage</b></small>
						</div>
						<Progress className="progress-xs" color="danger" value="95"/>
						<small className="text-muted">243GB/256GB</small>

						<div className="text-uppercase mb-1 mt-2">
							<small><b>SSD 2 Usage</b></small>
						</div>
						<Progress className="progress-xs" color="success" value="10"/>
						<small className="text-muted">25GB/256GB</small>

						<div className="text-uppercase mb-1 mt-2">
							<a href={ '/api/current_user' } target={ '_blank' }>client info</a>
						</div>
						<div className="text-uppercase mb-1 mt-2">
							<a href={ '/api/clientLog' } target={ '_blank' }>client log</a>
						</div>
					</TabPane>

					<TabPane tabId="2" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<div className="callout m-0 py-2 text-white text-center bg-dark text-uppercase">
							<small><b>Connect</b></small>
						</div>
						<hr className="transparent mx-3 my-0"/>
						<div className="callout callout-warning m-0 py-3">
							<div className="avatar float-right">
								<img src={ 'img/avatars/7.jpg' } className="img-avatar"
								     alt="cong-li@cong-li.com"/>
							</div>
							<div>Find <strong>Cong</strong></div>
							<small className="text-muted mr-3 text-bold"><i className="fa fa-google mr-2"/>
								<a href={ 'https://groups.google.com/a/cong-li.com/forum/#!forum/discuss' }
								   target={ '_blank' }>google group</a>
							</small>
							<br/>
							<small className="text-muted mr-3 bold"><i className="fa fa-envelope mr-2"/>
								<a href={ 'mailto:cong-li@cong-li.com' }>cong-li@cong-li.com</a>
							</small>

						</div>
						<hr className="mx-3 my-0"/>
						{/*<div className="callout callout-info m-0 py-3">*/}
							{/*<div className="avatar float-right">*/}
								{/*<img src={ 'img/avatars/4.jpg' } className="img-avatar"*/}
								     {/*alt="admin@bootstrapmaster.com"/>*/}
							{/*</div>*/}
							{/*<div>Skype with <strong>Megan</strong></div>*/}
							{/*<small className="text-muted mr-3"><i className="icon-calendar"/>&nbsp; 4 - 5pm</small>*/}
							{/*<small className="text-muted"><i className="icon-social-skype"/>&nbsp; On-line</small>*/}
						{/*</div>*/}
						<hr className="transparent mx-3 my-0"/>
						<div className="callout m-0 py-2 text-muted text-center bg-white text-uppercase">
							<small><b>General</b></small>
						</div>
						<hr className="transparent mx-3 my-0"/>
						<div className="callout callout-danger m-0 py-3">
							<div><strong> All User Avatars </strong></div>
							<small className="text-muted mr-3"><i className="icon-calendar"/>&nbsp; 10 - 11pm
							</small>
							<small className="text-muted"><i className="icon-home"/>&nbsp; creativeLabs HQ</small>
							<div className="avatars-stack mt-2">
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/2.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/3.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/4.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/5.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/6.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
							</div>
						</div>
						<hr className="mx-3 my-0"/>
						<div className="callout callout-success m-0 py-3">
							<div><strong>#10 Startups.Garden</strong> Meetup</div>
							<small className="text-muted mr-3"><i className="icon-calendar"/>&nbsp; 1 - 3pm</small>
							<small className="text-muted"><i className="icon-location-pin"/>&nbsp; Palo Alto, CA
							</small>
						</div>
						<hr className="mx-3 my-0"/>
						<div className="callout callout-primary m-0 py-3">
							<div><strong>Team meeting</strong></div>
							<small className="text-muted mr-3"><i className="icon-calendar"/>&nbsp; 4 - 6pm</small>
							<small className="text-muted"><i className="icon-home"/>&nbsp; creativeLabs HQ</small>
							<div className="avatars-stack mt-2">
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/2.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/3.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/4.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/5.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/6.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
								<div className="avatar avatar-xs">
									<img src={ 'img/avatars/8.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
								</div>
							</div>
						</div>
						<hr className="mx-3 my-0"/>
					</TabPane>

					<TabPane tabId="3" className={ `p-3 ${mode === '3D' ? 'align-self-center' : null}` }>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
						<hr/>
						<div className="message">
							<div className="py-3 pb-5 mr-3 float-left">
								<div className="avatar">
									<img src={ 'img/avatars/7.jpg' } className="img-avatar"
									     alt="admin@bootstrapmaster.com"/>
									<span className="avatar-status badge-success"/>
								</div>
							</div>
							<div>
								<small className="text-muted">Lukasz Holeczek</small>
								<small className="text-muted float-right mt-1">1:52 PM</small>
							</div>
							<div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
							<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
								do eiusmod
								tempor incididunt...
							</small>
						</div>
					</TabPane>
				</TabContent>
			</aside>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		setting : state.setting,
	};
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators ({setMode, setMouseTrack}, dispatch);
};
export default connect (mapStateToProps, mapDispatchToProps) (Aside);
