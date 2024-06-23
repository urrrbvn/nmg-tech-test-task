import { useEffect, useState } from 'react';
import './GameField.css';
import ItemZoneComponent from '../ItemZoneComponent/ItemZoneComponent'
const GameFieldComponent = () =>{

    const [questionRight, setQuestionRight] = useState(false)
    const [questionAttempted, setQuestionAttempted] = useState(false)
    const [pickedItem, setPickedItem] = useState('')

    const items = [
        {id: 1, name: 'key'},
        {id: 2, name: 'bat'},
        {id: 3, name: 'clock'},
    ]
    const question = {
            answerTitle: 'Правильный ответ — металлический ключ. ',
            rightOption:{item: 'key', text: 'Дали, сидя в кресле, держал его в руке над тарелкой или подносом. Как только он начинал засыпать и пальцы разжимались, ключ падал с громким звуком и возвращал художника из полусна, позволяя запомнить образы, возникшие в этом состоянии, и использовать их для сюжетов его картин.'} ,
            wrongOptions:[
                {item: 'bat', text: 'С его помощью Дали просыпался, не успев погрузиться в сон полностью, и зарисовывал привидевшиеся ему в состоянии полусна образы. Живая летучая мышь жила у Дали, когда он был ребёнком, но во взрослом возрасте с летучими мышами в качестве помощников вдохновению он дела не имел.'},
                {item: 'clock', text: 'С его помощью Дали просыпался, не успев погрузиться в сон полностью, и зарисовывал привидевшиеся ему в состоянии полусна образы. А вот будильник завести с такой точностью просто невозможно.'}
            ]
        }
    
        function getQuestionText (item){
            if(item === question.rightOption.item){
                return question.rightOption.text
            }
            if(item !== question.rightOption.item && item !== ''){
                let wrongIndex = question.wrongOptions.findIndex(elem => elem.item === item)
                return question.wrongOptions[wrongIndex].text
            }
            else{
                return 'Как и многие великие люди, Сальвадор Дали черпал вдохновение в том числе в сновидениях. Какой предмет он использовал для этого использовал, собираясь вздремнуть после обеда?'
            }
        }

    function gameZoneDrop (e){
        let item = e.dataTransfer.getData('text/plain')
        console.log(item)
        setPickedItem(item)
        setQuestionAttempted(true)
    }
    useEffect(()=>{
        if(pickedItem === question.rightOption.item){
            setQuestionRight(true)
        }
    }, [pickedItem])


    return(
        <div className="game-container">
            <div className="game-zone" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>gameZoneDrop(e)}>
                <img className='illustration' src={`/assets/images/${!questionRight ? 'game1' :  'game2'}.png`} alt="" width='100%'/>
                {
                    !questionRight && (
                        <div className="items">
                        {
                            items.map((item)=>
                                <ItemZoneComponent key={item.id} item={item} rightAnswer={question.rightOption.item}/>
                            )
                        }
                        </div>
                    )
                }
            </div>
            <div className="question-block">
                <p className='question-text'>
                    {questionAttempted ? <span style={{color: questionRight ? 'green' : 'red'}}>{question.answerTitle}</span> : ''} 
                    {getQuestionText(pickedItem)}
                </p>
            </div>
        </div>
    );
};

export default GameFieldComponent;