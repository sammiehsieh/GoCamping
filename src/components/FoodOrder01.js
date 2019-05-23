import React from "react";
// 貨幣格式
// yarn add @pismo/react-currency-input
// import CurrencyInput from '@pismo/react-currency-input'
// import { BrowserRouter as NavLink } from "react-router-dom";
// import { FaHome } from 'react-icons/fa';
import {
  Row,
  Col,
  Container,
  Table,
  Form,
  Image,
  ButtonGroup,
  ButtonToolbar,
  Button
} from "react-bootstrap";

class FoodOrder01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "買食材-訂購明細",
      order_num: 1,
      price: props.order.salepage_price,
      total: "",
      salepageData: props.order
    };
    this.changeNum = this.changeNum.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
         salepageData: nextProps.data,
         price: nextProps.order.salepage_price, 
      }
      );
  }

  // 網頁標題
  componentDidMount() {
    document.title = this.state.title;
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  handleChange = (event, value, maskedValue) => {
    this.setState({ total: value })
  }

  changeNum(event){
    this.setState({
      order_num: event.target.value,
      total: event.target.value * this.state.price
    })

    // console.log(event.target.value)
    // console.log(this.state.price)
  }
  //到上一頁跟下一頁
  goP2 = () => {
      this.props.goP2();
  }

  render() {
    const { index, direction } = this.state;
    // console.log(this.props.order.salepage_name)
    // console.log(this.state.salepageData)
    return (
      <>
        {/* 進入訂單第一步 訂單明細*/}
        <Container className="mt-1">
          <Row className="mt-5">
            <Col>
              <div className=" forder01-title fs-32">訂購明細</div>
            </Col>
          </Row>
        </Container>
        {/* 訂購清單 */}
        <Container className="mt-1">
          <Row className="mt-5">
            <Col>
              <div className="ground fs-24">訂購清單</div>
            </Col>
          </Row>
        </Container>
        {/* 顯示清單 */}
        <Container className="mt-1 ">
          <Row className="">
            <Col>
              <Table bordered>
                <thead>
                  <tr className="text-center">
                    <th style={{ width: "20%" }}>商品圖片</th>
                    <th style={{ width: "30%" }}>商品名稱</th>
                    <th style={{ width: "10%" }}>單價</th>
                    <th style={{ width: "10%" }}>數量</th>                    
                    <th style={{ width: "10%" }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center justify-content-center">
                    
                    <td>
                      {" "}
                      <Image
                        style={{ width: "100%" }}
                        src={this.props.order.salepage_image}
                        rounded
                      />
                    </td>
                    <td>{this.props.order.salepage_name}</td>
                    <td>NT${this.props.order.salepage_price}</td>
                    <td>
                      <div className="">
                      <span className="fs-14"></span>
                        <input
                          value={this.state.order_num}
                          onChange={this.changeNum}
                          id="order_num"
                          type="number"
                          className="form-control text-center"
                          // placeholder="1"
                        />
                      </div>
                    </td>                    
                    <td>刪除</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {/* 總額 */}
        <Container className="forder01-totalcon">
          <Row>
            <Col style={{ width: "100%" }}>
              <div className="forder01-total">
                <p >共 {this.state.order_num} 項商品</p>
                <p >總金額 NT$ {this.state.total} </p>                
              </div>
              <p className="fs-12">
                備註：食材皆可於指定日期與時間送往指定地點
              </p>
            </Col>
          </Row>
        </Container>
        {/* 服務條款 */}
        <Container className="mt-1">
          <Row className="mt-5">
            <Col>
              <div className="ground fs-24">服務條款</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div style={{ width: "100%" }}>
                <div className="forder01-ser">
                  <p>
                    一、會員服務條款
                    <br />
                    1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成並通過認證者。
                    <br />
                    2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。
                    <br />
                    3.本站保留有審核加入會員資格之權利，另外已加入會員者，本站亦保留有解除其會員資格之權利。
                    <br />
                    4.本會員服務條款之修訂，適用於所有會員，當本站修訂本服務條款時，將於本站上公告。
                    <br />
                    一、會員服務條款
                    <br />
                    1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成並通過認證者。
                    <br />
                    2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。
                    <br />
                    3.本站保留有審核加入會員資格之權利，另外已加入會員者，本站亦保留有解除其會員資格之權利。
                    <br />
                    4.本會員服務條款之修訂，適用於所有會員，當本站修訂本服務條款時，將於本站上公告。
                    <br />
                    一、會員服務條款
                    <br />
                    1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成並通過認證者。
                    <br />
                    2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。
                    <br />
                    3.本站保留有審核加入會員資格之權利，另外已加入會員者，本站亦保留有解除其會員資格之權利。
                    <br />
                    4.本會員服務條款之修訂，適用於所有會員，當本站修訂本服務條款時，將於本站上公告。
                    <br />
                  </p>
                </div>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    type="checkbox"
                    label="我已閱讀並同意上述條款規則。"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Container>
        {/* 送出或返回button */}
        <Container className="forder01-btncon">
          <Row>
            <Col>
              {/* justify-content-between */}
              <ButtonToolbar className="justify-content-end">
                <Button
                  className="bg-food-default forder-btn mr-2 "
                  style={{ width: "30%" }}
                  sm={"block"}
                  href={"/Food/FoodDetails/" + this.props.order.id}
                >
                  返回食材列表
                </Button>
                <Button
                  className="bg-sunshine food-default forder-btn"
                  style={{ width: "30%" }}
                  sm={"block"}
                  onClick = {this.goP2}
                >
                  下一步，填寫資訊
                </Button>
              </ButtonToolbar>
            </Col>
            {/* <Col >
              <ButtonToolbar className="justify-content-between">
                <Button className="bg-sunshine food-default forder-btn" style={{ width: "70%" }} >
                  下一步，填寫資訊
                </Button>
             </ButtonToolbar> 
            </Col> */}
          </Row>
        </Container>
      </>
    );
  }
}
export default FoodOrder01;
