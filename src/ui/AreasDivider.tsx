import React, { useState } from 'react';

export default function AreasDivider(props: any) {

    let center = props.center;
    let width = 8;
    let index = props.index;
    let resizing = false;

    function handleMouseDown(e: React.MouseEvent) {
        props.setActive(index);
        e.preventDefault();
    }

    return (
        <div className='area-divider' onMouseDown={handleMouseDown} style={{
            left: `${center - width / 2}px`,
            width: `${width}px`
        }}>

        </div>
    )
}