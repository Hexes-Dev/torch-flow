import React, {useState, useRef} from "react";
import "./SplitPanel.css"



export default function SplitPanel(props: any) {
    const panelManager = useRef<HTMLDivElement>(null);

    let innerPanels = props.children.map( (child: any) => {
        let key = `panel${props.children.indexOf(child)}`;
        let width = `${100 / props.children.length}%`;
        let heigth = `${100}%`;
        return (
            <div className="outer-panel" key={key} style={{width: width, height: heigth}}>
                <div className="inner-panel">
                    {child}
                </div>
            </div>
        )
    });

    let [ratio, setRatio] = useState(.5)
    let [resizing, isResizing] = useState(false);

    function startDrag() {
        isResizing(true);
    }
    
    function endDrag() {
        isResizing(false);
    }
    
    function onDrag(e: React.MouseEvent) {
        if(!resizing) return;
        let mx = e.movementX;
        let width = panelManager.current ? panelManager.current.offsetWidth : 0;
        let percentChange = mx / width;
        setRatio(ratio += percentChange);
    }

    return (
        <div className="split-panel" ref={panelManager} onMouseMove={onDrag} onMouseUp={endDrag}>
            {innerPanels}
        </div>
    )
}