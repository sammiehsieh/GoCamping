import React from 'react';
import MemberCenter from './MemberCenter';

class LoginPage extends React.Component {
    constructor() {
        super()
        this.state = {
            memberexist: false, // 預設尚未登入
            memberData: [],
            account: '',
            password: ''
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:5555/members', {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            })

            if (!response.ok) throw new Error(response.statusText)

            const jsonObject = await response.json()

            // console.log(jsonObject) // 會員清單全部抓出來
            await this.setState({ memberData: jsonObject })
        } catch (e) {
            console.log(e)
        }
    }

    // 輸入帳號密碼時，有onChange的事件處理器(EventListener)
    onInputChange = (event) => {
        const { target } = event; // 抓到該<input>標籤，與const target = event.target相同
        // console.log(`輸入中：target - ${target}, type[${target.type}], id[${target.id}], name[${target.name}], value[${target.value}]`);
        // target的使用方法，東西都是從該<input>標籤來的

        switch (target.type) { // 接受打字中
            case 'text':
            case 'password':
                this.setState({ [target.name]: target.value }); // 讓State對應的key放入input的name和值(ex account: test)
                break;
            default:
                console.log(`Accept Unhandleable Type[${target.type}]`);
        }
    }

    // 按下登入按鈕的EventListener
    onSubmitClick = (event) => {
        // 將存在state裡已經輸入的帳號密碼儲存在localStorage裡
        localStorage.setItem("account", this.state.account);
        localStorage.setItem("password", this.state.password);
    }

    // 送出登入表單的EventListener
    onLoginPageSubmit = (event) => {
        event.preventDefault(); // 避免標籤元素預設的行為或功能(ex <input type="submit">就會送出，可是可能其他input有誤所以要alert)
        
        // 將儲存的localStorage帳號密碼拿出來
        const localStorageAccount = localStorage.getItem("account", this.state.account);
        const localStoragePassword = localStorage.getItem("password", this.state.password);
        
        // 如果存在localStorage的帳號密碼和memberDate其中一筆會員資料相同，讓state中的memberexist是true
        const findMemberAccount = this.state.memberData.find((data) => data.mem_account === localStorageAccount);
        // console.log(findMember) // 在memberData裡面找到一筆帳號是this.state.account的資料
        const findMemberPassword = this.state.memberData.find((data) => data.mem_password === localStoragePassword);
        // console.log(findMember) // 在memberData裡面找到一筆帳號是this.state.account的資料
        if(findMemberAccount && findMemberPassword){
            let pickMember = this.state.memberData.filter((data) => data.mem_account === localStorageAccount);
            // console.log(pickMember) // 過濾掉不需要用掉的其他會員資料
            this.setState({ memberData: pickMember, memberexist: true }); // renderMemberCenter()
        }
    }

    // 按下登出按鈕的EventListener
    // onLogoutFormSubmit = (event) => {
    //     event.preventDefault();
    //     alert('Do Logout!');

    //     this.setState({ memberexist: false });
    // }

    // 要呈現的「登入表單」畫面
    renderLoginPage = () => {
        return (
            <div className="container-fluid login_cover d-flex align-items-center justify-content-center">
                <main className="">
                    <p className="sunshine">可以先暫時使用(帳號tigger/密碼admin)登入</p>
                    <div className="card">
                        <div className="card-body py-4">
                            <h5 className="card-title text-center grass fs-24 mb-4">會員登入</h5>
                            <form onSubmit={this.onLoginPageSubmit}>
                                <div className="form-group row d-flex align-items-center border rounded p-1">
                                    <div className="mx-2">
                                        <i className="far fa-envelope"></i>
                                    </div>
                                    <input type="text" id="account" name="account" className="flex-grow-1 border-0" placeholder="帳號名稱" onChange={this.onInputChange} />
                                </div>
                                <div className="form-group row d-flex align-items-center border rounded p-1">
                                    <div className="mx-2">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <input type="password" id="password" name="password" className="flex-grow-1 border-0" placeholder="密碼" onChange={this.onInputChange} />
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">記住我的帳號</label>
                                    </div>
                                    <span>忘記密碼?</span>
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-grass col-12 fs-20" onClick={this.onSubmitClick}>登入</button>
                                </div>
                                <p className="text-center my-3">還不是會員嗎? <span className="ground">立即免費註冊</span></p>
                                <hr />
                                <p className="text-center mb-0 camp_boss">營地主登入</p>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // 登出表單
    // renderLogoutForm = () => {
    //     return (
    //         <form onSubmit={this.onLogoutFormSubmit}>
    //             <button type="submit" className="btn btn-grass col-12 fs-20">登出</button>
    //         </form>
    //     );
    // }

    // 已登入：會員中心畫面
    renderMemberCenter = () => {
        return (
            <MemberCenter data={this.state.memberData} />
        );
    }

    render() {
        return (
            <div>
                {/* 有無此會員 ? 有(會員中心頁) : 沒([預設]註冊頁) */}
                {/* {this.state.logined ? (this.renderLogoutForm()) : (this.renderLoginPage())} */}
                {this.state.memberexist ? (this.renderMemberCenter()) : (this.renderLoginPage())}
            </div>
        );
    }
}

export default LoginPage