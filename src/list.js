import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const MyItem = ({value}) => (
    <Form>
        <Form.Control disabled type="text" className="mb-2" value={value} />
    </Form>
)

const List = () => {
    const [cardName, setCardName] = useState("");
    const [todoValue,setTodoValue]=useState("");
    const [itemCardList, setItemCardList] = useState([]);

    const onChangeHandler = (event) => {
        setCardName(event.target.value);
    }

    const MyInputItem = ({ id }) => {

        const addAnotherCard = (value) => {
            let tempValue = itemCardList.filter(i => i.id === id);
            console.log("itemcardlist",itemCardList);
            let position = itemCardList.indexOf(tempValue);
            tempValue[0].item.push(todoValue);

            itemCardList[position] = tempValue;
        }
        const addInput = (event) => {
            setTodoValue(event.target.value);
            console.log(event.target.value);
            console.log("id",id);
            
        }
        return <Form >
            <Form.Control id="listInput" value={todoValue} type="text" onChange={addInput} className="mb-2" />
            <div className="mt-3" onClick={addAnotherCard}>+Add Another Card</div>
           
        </Form>
    }

    const MyCard = ({ value }) => {
        console.log(value);
        return <Card className="ml-5 mt-4" style={{ backgroundColor: 'hsl(240deg 14% 93%)', width: '18rem' }}>
            <Card.Title className="mt-3 ml-4">{value.head}</Card.Title>
            <Card.Body >
                {itemCardList[value.id-1] && itemCardList[value.id-1].item.map((i) => <MyItem value={i}/>)}
                <MyInputItem id = {value.id}/>
            </Card.Body>
        </Card>
    }

    const saveToLocalStorage = () => {
        setItemCardList([...itemCardList, { "head": cardName, item: ["angular","react"], id: (itemCardList.length + 1) }])
    }
    
    useEffect(() => console.log(itemCardList), [itemCardList]);

    const addCardButton = () => (
        <Button size="sm" className="p-2 mt-5 ml-5" style={{ width: "15rem", height: "3rem", backgroundColor: "rhsl(202deg 60% 52%)ed" }} >
            Add List
        </Button>
    );

    return (
        <div className="container">
            <div className="d-flex flex-wrap">
                {itemCardList.map((item) => <MyCard value={item} />)}
                {addCardButton()}
                <div >
                    <div className="mt-3 ml-3">
                        <br></br>
                        <div style={{ backgroundColor: 'hsl(240deg 14% 93%)', width: '18rem' }}><br></br>
                            <Form >
                                <Form.Control className="ml-3" type="text" style={{ width: '16rem' }} onChange={onChangeHandler} />
                            </Form>
                            <Button className="ml-3 mt-2 mb-2" variant="success" onClick={saveToLocalStorage}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;