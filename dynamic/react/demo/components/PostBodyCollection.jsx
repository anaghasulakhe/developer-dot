import React from 'react';

import {store} from '../store';
import {actionTypes} from '../reducers/reducer';
import PostBodySectionHeader from './postBodySectionHeader';
import PostBodyItem from './postBodyItem';

const handleAddItem = (paramName, endpointId, itemSchema) => {
    store.dispatch({
        type: actionTypes.ADD_ITEM_TO_POST_BODY_COLLECTION,
        postBodyParamName: paramName,
        endpointId: endpointId,
        itemSchema: itemSchema
    });
};

const PostBodyCollection = ({propertyName, endpointId, collection, schema, uiState, displayName}) => {
    return (
        <PostBodySectionHeader endpointId={endpointId} propertyName={propertyName} displayName={displayName}>
            <tr>
                <td>
                    <button type={'button'} onClick={
                    (e) => {
                        e.preventDefault();
                        handleAddItem(propertyName, endpointId, schema);
                    }
                }>
                        {'Add Item'}
                    </button>
                </td>
            </tr>
            {uiState.visible ? collection.map((itm, i) => {
                return (
                    <PostBodyItem
                        displayName={i}
                        endpointId={endpointId}
                        item={itm}
                        key={i}
                        name={`${propertyName ? propertyName + ';' : ''}[${i}]`}
                        uiState={itm.uiState}
                    />);
            }) : null}
        </PostBodySectionHeader>
    );
};

PostBodyCollection.displayName = 'Post Body Collection';

PostBodyCollection.propTypes = {
    endpointId: React.PropTypes.number.isRequired,
    propertyName: React.PropTypes.string.isRequired,
    uiState: React.PropTypes.shape({
        visible: React.PropTypes.bool
    })
};

export default PostBodyCollection;
