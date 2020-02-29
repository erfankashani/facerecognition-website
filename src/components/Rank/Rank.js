import React from 'react';

const Rank = ( props ) => {
    return(
        <div>
            <div className='white f3'>
                {` ${props.userInfo.name}, your score is ...`}
            </div>
            <div className='white f1'>
                {props.userInfo.entries}
            </div>
        </div>
    );
}

export default Rank;