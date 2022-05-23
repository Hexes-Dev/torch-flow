import React, {useState, useRef, useLayoutEffect, useEffect, ChangeEventHandler, ChangeEvent} from 'react';
import './Areas.css';
import AreasDivider from './AreasDivider';
import AreasPanel from './AreasPanel';
import FAB from './FAB';
import { v4 as uuidv4 } from 'uuid';


export default function Areas(props: any) {


    // initialize properties
    let borderRadius = props?.borderRadius || 12;
    let borderWidth = props?.borderWidth || 1;
    let margin = props?.margin || 2
    let dividerPadding = props?.dividerPadding || 8;
    let direction = props?.direction || 'row';
    

    let defaultElements = props?.defaultAreas || [<div></div>];

    const areaRef: any = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    let [children, setChildren]: Array<any> = useState([]);

    useEffect( () => {
        let areas = defaultElements.map( (element: any) => {
            return {
                element: element,
                width: dimensions.width / defaultElements.length - 2 * defaultElements.length * (margin + borderWidth),
                key: uuidv4(),
            }
        });

        setChildren( () => {
            return areas;
        });

    }, [dimensions]);

    
    

    const LOCAL_STORAGE_KEY = 'areas.area-list';


    function addPanel() {
        let newPanel = {
            element: <div></div>,
            width: 0,
            key: uuidv4(),
        };

        let currentChildren = [...children, newPanel];
        currentChildren.forEach( (v: any, i: number) => {
            currentChildren[i].width = dimensions.width / currentChildren.length - 2 * currentChildren.length * (margin + borderWidth);
        });
        
        setChildren( (children: any) => {
            return currentChildren;
        });
    }

    function removePanel(idx: number) {
        let currentChildren = [...children];
        currentChildren.splice(idx, 1);
        currentChildren.forEach( (v: any, i: number) => {
            currentChildren[i].width = 100 / currentChildren.length;
        });
        setChildren( (children: any) => {
            return currentChildren;
        });
    }


  
    useLayoutEffect(() => {
      if (areaRef.current) {
        setDimensions({
          width: areaRef.current.offsetWidth,
          height: areaRef.current.offsetHeight
        });
      }
    }, []);

    // function getDividerCenter(idx: number) {
    //     let itemsLeft = [...children].splice(0, idx);
    //     let percentLeft = itemsLeft.reduce( (prev: any, curr: any) => {
    //         return prev + curr.width;
    //     }, 0);

    //     let left = percentLeft / 100 * dimensions.width;
    //     return left;
    // }

    let [activeDivider, setActiveDivider] = useState(-1);
    
    function resizeEvent(e: React.MouseEvent) {

        if(activeDivider < 0) {
            return;
        }
        e.preventDefault();
        let idx = activeDivider;
        let currentChildren = [...children];
        let first = currentChildren[idx - 1];
        let last = currentChildren[idx];
        // let movementPercent = e.movementX / dimensions.width * 100;

        first.width = first.width + e.movementX;
        last.width = last.width - e.movementX;

        setChildren((children: any) => {
            return currentChildren
        });
    }

    let childComponents = children.map( (child: any, idx: number) => {
        return (<AreasPanel key={child.key} index={idx} removePanel={removePanel} width={child.width}>{child.element}</AreasPanel>)
    });
    
    let childDividers = children.map( (child: any, idx: number) => {
        let dividerLocation = (idx: number) => {
            let itemsLeft = [...children].splice(0, idx);
            let left = itemsLeft.reduce( (prev: any, curr: any) => {
                return prev + curr.width;
            }, 0);

                
            // let left = dimensions.width;
            return left;
        }
        return (<AreasDivider key={uuidv4()} index={idx} setActive={setActiveDivider} resizeEvent={resizeEvent} center={dividerLocation}/>)
    });

    return(
        <div className='areas' ref={areaRef} style={{flexDirection: direction}} onMouseMove={resizeEvent} onMouseUp={() => setActiveDivider(-1)}>
            {childComponents}
            {childDividers}
            <FAB onClick={(e: React.MouseEvent) => addPanel()} ></FAB>
        </div>
    )
}