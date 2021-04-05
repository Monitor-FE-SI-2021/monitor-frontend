import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './RemoteAccess.scss';

import Terminal from '../../components/Terminal/Terminal';
import RemoteControl from '../RemoteControl/RemoteControl';

const RemoteAccess = ({ machine }) => {
	return (
		<div className='remote-access'>
			<h1>IWM Remote Access</h1>
			<h2>{ machine.name }</h2>
			<Tabs>
				<TabList>
					<Tab>
						<span className='react-tabs__tab__label'>Terminal</span>
					</Tab>
					<Tab>
						<span className='react-tabs__tab__label'>Screenshot</span>
					</Tab>
				</TabList>

				<TabPanel>
					<Terminal machine={machine} />
				</TabPanel>

				<TabPanel>
					<RemoteControl machine={machine} />
				</TabPanel>
			</Tabs>
		</div>
	);
};

RemoteAccess.propTypes = {
	machine: PropTypes.object.isRequired
};

export default RemoteAccess;
