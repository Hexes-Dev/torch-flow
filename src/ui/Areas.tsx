import React, {useState, useRef, MouseEvent} from 'react';
import './Areas.css';

export default function Areas(props: any) {

    let borderRadius = props?.borderRadius || 12;
    let borderWidth = props?.borderWidth || 1;
    let margin = props?.margin || 2
    let direction = props?.direction || 'row';
    let areas = props?.defaultAreas || [<div></div>];

    let [areaWidths, setWidths] = useState(areas.map((area: any) => `${100 / areas.length}%`));

    let dividerEventStarted = areas.map((area: any) => false);

    function dividerEventStart(e: MouseEvent) {
        let idxAttribute = e.currentTarget.getAttribute('custom-attribute');
        let idx = idxAttribute == null ? 0 : parseInt(idxAttribute) - 1;
        dividerEventStarted[idx] = true;
    }

    function dividerEventMove(e: MouseEvent) {
        let idx = dividerEventStarted.indexOf(true);
        if(idx < 0) {
            return false;
        }
        console.log(areaWidths)
        setWidths((arr: any) => ['25%', '75%']);

        e.preventDefault();
        
        
    }

    function dividerEventEnd() {
        dividerEventStarted = dividerEventStarted.map((bool: boolean) => false);
    }

    function mapChild(area: any) {
        let idx = areas.indexOf(area);
        let key = `area-${idx}`;

        let dividerStyle: any = {};
        if(direction == 'row') {
            dividerStyle.left = `${-2 * margin - borderWidth}px`;
        } else {

        }

        return(
            <div className='area' key={key} style={{
                borderRadius: borderRadius+'px',
                margin: margin+'px',
                border: `solid ${borderWidth}px black`,
                width: areaWidths[idx]
            }}>
                {area}
                {idx > 0 && <div className='area-divider' style={dividerStyle} onMouseDown={dividerEventStart} custom-attribute={idx}></div>}
            </div>
        )
    }

    let childElements = areas.map(mapChild);

    let [children, setChildren] = useState(childElements);

    return(
        <div className='areas' onMouseMove={dividerEventMove} onMouseUp={dividerEventEnd}>
            {children}
        </div>
    )
}