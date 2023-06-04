import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import data from './data'; // 0~2까지의 신발 데이터
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail';
import axios from 'axios';
import bg from './img/bg.png';
import styled from "styled-components";
import Cart from './pages/Cart'

let DefaultBtn = styled.button`
  padding: 8px 16px;
  background-color: ${ props => props.bg };
  font-weight: 400;
  color: ${ props => props.bg === '#f4f4f4' ? '#333' : '#fff'};
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 25px;
`

function App() {
  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [num, setNum] =  useState(1);
  let [loading, setLoading] =  useState(true);

  return (
    <div className="App">
      <div className='contents'>
        {/* nav bar */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand onClick={()=>{ navigate('/') }}>Shoes Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          {/* main */}
          <Route path="/" element={
            <>
              {/* main banner */}
              <div className="main-bg" style={{ backgroundImage : 'url(' + bg + ')' }}></div>

              {/* card list */}
              <Container className="mt-4">
                <div className="d-flex gap-1 mb-4">
                  <DefaultBtn bg="#f4f4f4">가나다순</DefaultBtn>
                  <DefaultBtn bg="#f4f4f4">높은 가격순</DefaultBtn>
                  <DefaultBtn bg="#f4f4f4">낮은 가격순</DefaultBtn>
                </div>
                <Row>
                {
                  shoes.map(function(a, i){
                    return (
                      <Col xs={12} md={4}>
                        <Card shoes={shoes[i]} i={ i } key={ i } />
                      </Col>
                    )
                  })
                }
                </Row>
              </Container>

              {
                num < 3 
                ? <DefaultBtn bg="#111" className='mt-4' onClick={()=>{
                    setNum(++num);
                    setLoading(false);
                    axios.get(`https://codingapple1.github.io/shop/data${num}.json`)
                    .then((data)=>{ 
                      setLoading(true);
                      let copy = [...shoes, ...data.data];
                      setShoes(copy);
                    })
                    .catch(()=>{
                      setLoading(false);
                      console.log('실패함');
                    })
                  }}>{loading === true ? '더보기 +' : '로딩중'}</DefaultBtn>
                : null
              }
              

              {/* 최근 본 리스트 */}
              {/* <Container>
                최근 본 상품
              </Container> */}
            </>
          } />
          {/* detail */}
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />

          {/* error */}
          <Route path="*" element={<div className='py-4'>없는 페이지입니다.</div>} />
        </Routes>
      </div>
      <footer>&copy; All right jungeun.park</footer>
    </div>
  );
}

function Card(props){
  return (
    <Link to={`/detail/${props.shoes.id}`} className='product'>
      <img 
        src={`https://codingapple1.github.io/shop/shoes${ props.i + 1 }.jpg`} 
        alt={ props.shoes.title }
        width="80%"
      />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </Link>
  )
}

export default App;
