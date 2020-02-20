import React from 'react';

const Rank = ( props ) => {
    console.log(JSON.stringify(props.userInfo, null, 2));
    console.log(props.userInfo.name);
    console.log(props.userInfo.entries);

    // const { entries , name} = userInfo;
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