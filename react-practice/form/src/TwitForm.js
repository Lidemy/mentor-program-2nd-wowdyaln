import React, { Component } from 'react';
import './TwitForm.css';
var classNames = require('classnames');

const Checkbox = (props)=> {
  const {title, value, checked, onChange} = props

  return (
    <React.Fragment>
      <input 
        type="checkbox" 
        name="time"
        value={value} // value="morning" 
        id={value} // id="morning" 
        checked={checked} // checked={time.indexOf("morning") !== -1}
        onChange={onChange} // onChange={this.handleOnCheckbox}
        />
      <label htmlFor={value}> {title} </label>
    </React.Fragment>
  )
}

const initialState = {
  name: "",
  address: "",
  other: "",
  gender: "",
  city: "taipei",
  time: [],  
  autoSave: false,
  intervalId: ""
}

class TwitForm extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()

    this.state = initialState
  }

  resetState() {
    this.setState(initialState)
    console.log("reset state !");
    window.location.reload(true)
  }

  handleSubmit = (e)=> {
    e.preventDefault()
    const {name, address, gender, city, time} = this.state
    if (name && address && gender && city && time.length > 0 ) {
      localStorage.clear()
      alert(
        `表單送出！

        ${JSON.stringify(this.state)}
        
        清空 localStorage.`)
      
      this.resetState()
    } else {
      alert("please fill out the missing content.")
    }
  }

  handleOnChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  runAutoSave = (ms)=> {
    let setAutoSave = setInterval( ()=>{  //! 注意寫法
      this.setToLocalStorage()
    }, ms)
    this.setState({ intervalId: setAutoSave })
  }
  
  stopAutoSave = ()=> {
    console.log("autoSave stopped");
    clearInterval(this.state.intervalId)
  }

  handleOnToggle = (e)=> {
    this.setState({
      [e.target.name]: e.target.checked
    })
    //* 15 秒，auto save 一次。
    if (!this.state.autoSave) {
      this.runAutoSave(15000)
    } else {
      this.stopAutoSave()
    }
  }


  handleOnCheckbox = (e)=> {
    const { time } = this.state
    const value = e.target.value
    const newTime = time.filter(item=> item !== value)

    if (newTime.length === time.length) {
      this.setState({
        time: [...time, value]
      })
    } 
    else {
      this.setState({
        time: newTime
      })
    }
  }

  setToLocalStorage() {
    // console.log(this.state);
    const { name, address, other, gender, city, time } = this.state

    const data = { name, address, other, gender, city, time }
    let formString = JSON.stringify(data)
    localStorage.setItem('formData', formString)
    console.log("save to localStorage. ");
  }

  getFromLocalStorage() {
    const formFromStorage = JSON.parse(localStorage.getItem('formData'))
    const { name, address, other, gender, city, time } = formFromStorage
    this.setState({ name, address, other, gender, city, time })
  }

  clearLocalStorage() {
    localStorage.clear()
  }

  componentDidMount() {
    this.inputRef.current.focus()
    
    if (localStorage.length !== 0) {
      this.getFromLocalStorage()
    }
  }



  render() {
    const { name, address, other, gender, city, time } = this.state

    let nameClass = classNames({
      "qRequired": true,
      "warning": !name
    })
    let addressClass = classNames({
      "qRequired": true,
      "warning": !address
    })
    let timeClass = classNames({
      "qRequired": true,
      "warning": time == false
    })
    let genderClass = classNames({
      "qRequired": true,
      "warning": !gender
    })
    
    function warningMSG(v){
      if (v == false) {
        return (
          <div className="warningMSG">這是必填問題</div>
        )
      }
      return
    }

    return (
      <div className="App">
        <div className="background__head"></div>
        <div className="background__body">
          <div className="sheet">
            <div className="sheet__title">推友來玩耍！推特二手市集</div>
            <div className="sheet__discription">認識新朋友，也為自己不需要的東西找到新主人！《推友來玩耍！推特二手市集》是一個「推聚」+「二手交換市集」 各式興趣或想法都會在這裡集結 無論你想討論公共議題、交換二手書 還是要出清你莫名其妙的購物欲 都．可．以 ！</div>
            <p className="sheet__required">* 必填</p>
            <form onSubmit={this.handleSubmit}>
              <div className={nameClass}>
                <div className="qRequired__name" data-star="*">姓名</div>
                <div className="inputSection">
                  <input className="inputSection__text"
                        type="text" name="name" placeholder="your name"
                        onChange={this.handleOnChange} ref={this.inputRef}
                        value={name}/>
                  <div className="underline"></div>
                  {warningMSG(name)}
                </div>
              </div>
              
              <div className={addressClass}>
                <div className="qRequired__name" data-star="*">地址</div>
                <div className="inputSection">
                  <input className="inputSection__text"
                        type="text" name="address" placeholder="address"
                        onChange={this.handleOnChange}
                        value={address}/>
                  <div className="underline"></div>
                  {warningMSG(address)}
                </div>
              </div>

              <div className="qRequired">
                <div className="qRequired__name">備註</div>
                <div className="inputSection">
                  <textarea className="inputSection__text"
                    rows="3" value={other}
                    name="other" 
                    onChange={this.handleOnChange} ></textarea>
                  <div className="TextAreaUnderline"></div>
                </div>
              </div>

              <div className={genderClass}>
                <div className="qRequired__name" data-star="*">性別</div>
                <div className="inputSection inputSection__text">
                  <input type="radio" name="gender" id="male" value="male" 
                    checked={gender === "male"}
                    onChange={this.handleOnChange}
                    />
                  <label htmlFor="male">男</label>

                  <input type="radio" name="gender" id="female" value="female" 
                    checked={gender === "female"}
                    onChange={this.handleOnChange}
                    />
                  <label htmlFor="female">女</label>
                </div>
                {warningMSG(gender)}
              </div>

              <div className="qRequired">
                <div className="qRequired__name" data-star="*">城市</div>
                <div className="inputSection inputSection__text">
                  <select value={city} name="city" onChange={this.handleOnChange}>
                    <option value="taipei">台北市</option>
                    <option value="taichung">台中市</option>
                    <option value="kaoshiung">高雄市</option>
                  </select>
                </div>
              </div>


              <div className={timeClass}>
                <div className="qRequired__name" data-star="*">時段</div>
                <div className="inputSection inputSection__text">
                  <Checkbox 
                  title="早上" 
                  value="morning" 
                  checked={ time.indexOf("morning") !== -1} 
                  onChange={this.handleOnCheckbox}
                />
                <Checkbox 
                  title="中午" 
                  value="noon"
                  checked={ time.indexOf("noon") !== -1} 
                  onChange={this.handleOnCheckbox}
                />
                <Checkbox 
                  title="晚上" 
                  value="evening" 
                  checked={ time.indexOf("evening") !== -1} 
                  onChange={this.handleOnCheckbox}
                />
                </div>
                {warningMSG(time)}
              </div>

              {/* auto save switch */ }
              <div className="can-toggle">
                <input id="a" type="checkbox" name="autoSave" onChange={this.handleOnToggle}/>
                <label htmlFor="a" className="toggleBtn">  
                  <div className="can-toggle__switch" data-checked="On" data-unchecked="Off"></div>
                  <div className="can-toggle__label-text">auto Save</div>
                </label>
              </div>

              {/* submit button */}
              <div><input type="submit" id="submit"/></div>
              <div className="note">請勿利用表單送出密碼。</div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default TwitForm