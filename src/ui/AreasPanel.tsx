import React, {useState, useRef, MouseEvent, MouseEventHandler} from 'react';
import './Areas.css';

export default function AreasPanel(props: any) {

    // initialize properties
    let borderRadius = props?.borderRadius || 12;
    let borderWidth = props?.borderWidth || 1;
    let margin = props?.margin || 2
    let dividerPadding = props?.dividerPadding || 8;
    let innerElement = props?.children || <div></div>;
    let width = props?.width || 100;

    

    return(
        <div className='area' key={1} style={{
            'borderRadius': borderRadius+'px',
            'margin': margin+'px',
            'border': `solid ${borderWidth}px black`,
            'width': `${width}%`,
        }}>
            {innerElement}
        </div>
    )
}