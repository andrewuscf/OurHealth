import { fromPairs } from 'lodash';
import { SET_TOKEN } from './actions/ActionTypes';
import { sequence } from './actions/actionHelpers';

import { getUser } from './actions/GlobalActions';


export default fromPairs([
    [SET_TOKEN, sequence([getUser])],
]);