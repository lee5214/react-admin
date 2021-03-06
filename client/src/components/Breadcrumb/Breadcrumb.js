import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../routes';
import { Breadcrumb, Col, Row } from '../';
import style from './Breadcrumb.scss';

const findRouteName = url => routes[ url ];

const getPaths = (pathname) => {
	const paths = [ '/' ];

	if (pathname === '/') return paths;

	pathname.split ('/').reduce ((prev, curr, index) => {
		const currPath = `${prev}/${curr}`;
		paths.push (currPath);
		return currPath;
	});
	//console.log ('paths', paths);
	return paths;
};

const BreadcrumbsItem = ({match, ...rest}) => {
	const routeName = findRouteName (match.url);
	//console.log ('match', match);
	if (routeName) {
		return (
			match.isExact ?
				(
					<Breadcrumb.Item active>{ routeName.toUpperCase() }</Breadcrumb.Item>
				) :
				(
					<Breadcrumb.Item href={ match.url || '' }>
						{ routeName }
					</Breadcrumb.Item>
				)
		);
	}
	return null;
};

const Breadcrumbs = ({location : {pathname}, match, ...rest}) => {
	const paths = getPaths (pathname);
	const items = paths.map ((path, i) => <Route key={ i++ } path={ path } component={ BreadcrumbsItem }/>);
	return (
		<Row>
			<Col lg={ 12 } className={ style.navbar_column }>
				<h2 className={ style.sub_navbar_header }>
					{ items[ items.length - 1 ] }
				</h2>
				<Breadcrumb className={style.sub_breadcrumb}>
					{ items }
				</Breadcrumb>
			</Col>
		</Row>
	);
};

export default (props) => (
	<div>
		<Route path="/:path" component={ Breadcrumbs } { ...props } />
	</div>
)
;
