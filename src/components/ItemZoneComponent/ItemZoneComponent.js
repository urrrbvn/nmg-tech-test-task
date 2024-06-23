import { useState } from 'react';
import './ItemZone.css';

const ItemZoneComponent = ({item, rightAnswer})=>{

    const [offset, setOffset] = useState({left: 0, top: 0})
    const [position, setPosition] = useState({ left: '50%', top: '50%' })
    const [isDrag, setIsDrag] = useState(false)

    function goBack(){
        setPosition({top: '50%', left:'50%'})
    }

    function ItemZoneDrop(e){
        goBack()
    }
    function itemDrag(e){
        if(isDrag){
            const containerRect = e.target.parentNode.getBoundingClientRect();

            const left = e.clientX - containerRect.left - offset.left
            const top = e.clientY - containerRect.top - offset.top

            setPosition({left, top})
        }
    }
    function itemDragStart(e, item) {
        e.dataTransfer.setData('text/plain', item.name)
        setIsDrag(true)
        setOffset({
            left: e.clientX - e.target.getBoundingClientRect().left - (e.target.offsetWidth / 2),
            top: e.clientY - e.target.getBoundingClientRect().top - (e.target.offsetHeight / 2)
        })

    }
    function itemDragEnd(e){
        e.target.style.transition = 'all 0.5s'
        setIsDrag(false)
        if(item !== rightAnswer){
            setTimeout(()=>{
                goBack()
            }, 100)
            
        }
    }

    return(
        <div className="item-zone" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>ItemZoneDrop()}>
            <img src="/assets/images/cloud.png" alt="" />
            <img className="game-item" src={`/assets/images/${item.name}.png`} alt="" 
                draggable='true'
                onDrag={(e)=>itemDrag(e)}
                onDragStart={(e)=>itemDragStart(e,item)}
                onDragEnd={(e)=>itemDragEnd(e)}
                style={{top: position.top, left: position.left}}
            />
        </div>
    )
}
export default ItemZoneComponent;