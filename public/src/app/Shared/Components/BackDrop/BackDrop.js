import React from 'react'

const backDrop = (props) => {
    if (props.show) return <div onClick={props.close} className="backdrop"></div>
    else return null;
};

export default backDrop;
