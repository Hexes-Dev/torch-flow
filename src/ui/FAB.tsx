import React from 'react';

export default function FAB(props: any) {

    let size = props?.size || '32px';
    let color = props?.color || '#127369';
    let position = props?.position || 'bottom-right';

    let bottom = position.includes('bottom') ? '16px' : 'unset';
    let right = position.includes('right') ? '16px' : 'unset';
    let top = position.includes('top') ? '16px' : 'unset';
    let left = position.includes('left') ? '16px' : 'unset';

    return (
        <div style={{
            position: 'absolute',
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size,
            zIndex: 1000,
            bottom: bottom,
            top: top,
            left: left,
            right: right,
            boxShadow: '0px 4px 6px #000A',
            cursor: 'pointer'
        }} onClick={props?.onClick}></div>
    )
}