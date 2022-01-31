import React from 'react';
import { render } from 'react-dom';
import Home from './component/Home.jsx';

class App extends React.Component {
	render () {
		return (
      <Home />
		);
	}
}

render(<App/>, document.getElementById('app'));
