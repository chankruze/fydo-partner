/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// let oldRender = Text.render;
// Text.render = function(...args) {
//   let origin = oldRender.call(this, ...args);
//   return React.cloneElement(origin, {
//     style: [{fontFamily: 'Lato-Regular'}, origin.props.style],
//   });
// };

AppRegistry.registerComponent(appName, () => App);
