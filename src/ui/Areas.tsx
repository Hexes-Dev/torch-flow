import React, {useState, useRef, MouseEvent} from 'react';
import './Areas.css';

export default function Areas(props: any) {

    let borderRadius = props?.borderRadius || 12;
    let borderWidth = props?.borderWidth || 1;
    let margin = props?.margin || 2
    let direction = props?.direction || 'row';
    let areas = props?.defaultAreas || [<div></div>];

    let [areaWidths, setWidths] = useState(areas.map((area: any) => `${100 / areas.length}%`));

    let [width, setWidth] = useState('50%');

    let dividerEventStarted = areas.map((area: any) => false);

    let areasRef = useRef(null);
    let areaRefs = areas.map((area: any) => useRef(null));

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

        let mainAreas: any = areasRef.current;

        let area1 = areaRefs[idx].current;
        let area2 = areaRefs[idx+1].current;

        let area1Percent = parseFloat(area1.style.width);
        let area2Percent = parseFloat(area2.style.width);
        let totalPercent = area1Percent + area2Percent;
        let movementPercent = e.movementX / mainAreas.offsetWidth * 100;

        

        area1.style.width = `${area1Percent + movementPercent}%`;
        area2.style.width = `${area2Percent - movementPercent}%`;


        console.log(movementPercent, area1.style.width, area2.style.width)

        e.preventDefault();
    }

    function dividerEventEnd() {
        dividerEventStarted = dividerEventStarted.map((bool: boolean) => false);
        console.log(areaWidths);
    }
    

    function mapChild(area: any, idx: number) {
        let key = `area-${idx}`;
        let dividerStyle: any = {};
        if(direction == 'row') {
            dividerStyle.left = `${-2 * margin - borderWidth}px`;
        } else {

        }

        return(
            <div className='area' key={key} ref={areaRefs[idx]} style={{
                'borderRadius': borderRadius+'px',
                'margin': margin+'px',
                'border': `solid ${borderWidth}px black`,
                'width': areaWidths[idx]
            }}>
                {area}
                {idx > 0 && <div className='area-divider' style={dividerStyle} onMouseDown={dividerEventStart} custom-attribute={idx}></div>}
            </div>
        )
    }

    let childElements = areas.map(mapChild);

    let [children, setChildren] = useState(childElements);

    return(
        <div className='areas' ref={areasRef} style={{flexDirection: direction}} onMouseMove={dividerEventMove} onMouseUp={dividerEventEnd}>
            {children}
        </div>
    )
}