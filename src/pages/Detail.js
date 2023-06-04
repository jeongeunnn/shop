import { useEffect, useState } from "react";
import { Modal, Button, InputGroup, Form, Nav } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import styled from "styled-components";

let Box = styled.div`
  padding: ccc25px; 
  background-color: #fff7e1;
  color: #555;
  border-radius: 10px;
`;

function Detail(props){
  let {id} = useParams();
  let item = props.shoes.find((data)=>data.id === Number(id));

  props.shoes.find((data)=>console.log(data))

  let [promotion, setPromotion] = useState(true);
  let [inpVal, setInpVal] = useState('');
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  
  useEffect(()=>{
    let timer = setTimeout(()=>{setPromotion(false)}, 2000);
    // console.log(2);
    return ()=>{ // unmount시 실행
      clearTimeout(timer);
      // console.log(1);
    }
  }, []);

  useEffect(()=>{
    if(isNaN(inpVal) === true){
      alert('숫자만 입력하세요.')
    }
  }, [inpVal]);

  useEffect(()=>{
    let timer2 = setTimeout(()=>setFade2('end'), 10);

    return ()=>{
      clearTimeout(timer2);
      setFade2('');
    }
  },[]);

  return (
    <div className={`container start ${fade2}`}>
      {
        promotion === true 
        ? <Box className="mt-4">2초이내 구매시 <strong>10%</strong> 할인!</Box> : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}</p>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="수량을 입력하세요."
              aria-label="수량을 입력하세요."
              aria-describedby="basic-addon"
              // input에 입력받은 내용을 변수에 담기
              onChange={(e)=> setInpVal(e.target.value)}
            />
            <Button variant="btn btn-danger px-4" id="button-addon">
              주문하기
            </Button>
          </InputGroup>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link-0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link-1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link-2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div> 
  )
}

function TabContent({tab}){
  let [fade, setFade] = useState('');

  useEffect(()=>{
    let timer = setTimeout(()=>{setFade('end')}, 10);

    return()=>{
      clearTimeout(timer);
      setFade('');
    }
  }, [tab])

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  )
}

export default Detail;