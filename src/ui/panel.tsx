import React, {useState, useRef} from "react";
import "./panel.css"



function Panel({panels}: any) {
    const panelManager = useRef<HTMLDivElement>(null);
    const panel1 = useRef<HTMLDivElement>(null);
    const panel2 = useRef<HTMLDivElement>(null);

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
        <div className="panel-manager" ref={panelManager} onMouseMove={onDrag} onMouseUp={endDrag}>
            <div className="panel panel-1" ref={panel1} style={{flexGrow: ratio}}>
                {panels[0]}
            </div>
            <div className="panel-divider" onMouseDown={startDrag}  ></div>
            <div className="panel panel-2" ref={panel2} style={{flexGrow: 1 - ratio}}>
                {panels[1]}
            </div>
        </div>
    )
}

export default Panel;