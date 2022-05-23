import React, {useState, useRef, MouseEvent, MouseEventHandler, useEffect} from 'react';
import './Areas.css';

export default function AreasPanel(props: any) {

    // initialize properties
    let borderRadius = props?.borderRadius || 12;
    let borderWidth = props?.borderWidth || 1;
    let margin = props?.margin || 2
    let dividerPadding = props?.dividerPadding || 8;
    let innerElement = props?.children || <div></div>;
    let width = props?.width || 100;


    // let LOCAL_STORAGE_KEY = `torchFlow.areapanel.${props.key}`;

    // useEffect( () => {
    //     const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     if (storedState) innerElement = JSON.parse(storedState);
    // }, []);

    // useEffect( () => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(innerElement));
    // }, [innerElement])
    

    return(
        <div className='area' key={1} style={{
            'borderRadius': borderRadius+'px',
            'margin': margin+'px',
            'border': `solid ${borderWidth}px black`,
            'width': `${width}px`,
        }}>
            {innerElement}
        </div>
    )
}