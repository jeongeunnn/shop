import { Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart(){
  let store = useSelector((state)=>{ return state.cartData })

  console.log(store);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            store.map(function(data, i){
              return (
                <tr>
                  <td>{ data.id }</td>
                  <td>{ data.name }</td>
                  <td>{ data.count }</td>
                  <td><Button variant="secondary">수량변경</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart