import React, {Component, Fragment} from 'react';

class Comp extends Component {
	constructor() {
		super();
		
		this.state = {
			platformList:[
				{
					id:'visitor',
					checked:1
				},
				/* {
					id:'kefu',
					checked:0
				} */
			],
			msgTypeMap: {},
			platform:0,	// 平台类型
			msgType: '',	// 消息类型
			// 上报实体
			msgData: null
		};
	}
	componentDidMount() {
		this.xhr('/getMsgTypeMap', {
			method: 'GET',
			onload: this.onMsgTypeMapLoad.bind(this)
		});
	}
	onMsgTypeMapLoad(res) {
		const result = JSON.parse(res).result;
		this.setState({
			msgTypeMap: result
		})
	}
	doChangePlatform(index,id,e){
		let list = [...this.state.platformList];
		list.map((item)=>{
			if(item.id == id){
				item.checked = 1;
				this.setState({
					platform: item.id
				})
			} else{
				item.checked = 0;
			}
		});
		this.setState({
			platformList: list,
		});
	}
	doChangeType(type){
		let msgTypeMap = {...this.state.msgTypeMap};
		msgTypeMap[type].checked = 1;
		this.setState({
			msgType: type,
			msgTypeMap : msgTypeMap,
			msgData: msgTypeMap[type].content
		});
	}
	// 切换开关
	doChangeSwitch(index,id,e){
		const {msgTypeList} = this.state;
		const list = [...this.state.msgTypeList];
		list[index].switch = list[index].switch ? 0 : 1;
		this.setState({
			msgTypeList: list
		},()=>{
			this.xhr('/switch',{
				method:'POST',
				data: list[index]
			});
		})
	}
	doSend(){
		this.setState({
			
		},()=>{
			this.xhr('/send',{
				method:'POST',
				data: {
					msgType: this.state.msgType
				}
			});
		})
	}
	xhr(url,option){
		const xhr = new XMLHttpRequest();
		const {method,mime,data,onload} = option;
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState == 4 && xhr.status == 200){
				onload && onload(xhr.responseText);
			}
		};
		xhr.open(method,'http://127.0.0.1:3000' + url);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(data));
	}
	render() {
		return (
			<div className="m-server" id="root">
				<div className="m-server__header">
					<div className="m-server__header__main">
						<h2 className="u-ttl h2">W.S. Helper <span className="small">v0.0.1</span></h2>
					</div>
					<div className="m-server__header__side">
						<button className="u-btn" 
								onClick={this.doSend.bind(this)}
						>Send Message</button>
					</div>
				</div>
				<div className="m-server__bodyer">
					<div className="m-server__platform">
						<h5 className="u-ttl h5">platform: </h5>
						<ul className="m-server__plist">
						{
							this.state.platformList.map((item,index)=>{
								return (
									<li key={item.id} >
										<label className="u-label">
											<input className="u-cb" type="radio" name="platform" defaultChecked={!!item.checked}
												   onClick={this.doChangePlatform.bind(this,index,item.id)}
											/>
											<span className="u-label__txt">{item.id}</span>
										</label>
									</li>
								)
							})
						}
						</ul>
					</div>
					<div className="m-server__goods">
						<h5 className="u-ttl h5">type:</h5>
						<ul className="m-server__glist">
							{
								Object.keys(this.state.msgTypeMap).map((key)=>{
									const item = this.state.msgTypeMap[key];
									return (
										<li key={key}>
											<label className="u-label">
												<input className="u-cb" type="radio" name="goods" defaultChecked={key == this.state.msgType}
													   onClick={this.doChangeType.bind(this, key)}
												/>
												<span className="u-label__txt">{key}</span>
											</label>
											<label className="u-label">
												<input className="u-cb" type="checkbox" name="switch" defaultChecked={!!item.switch}
													   onClick={this.doChangeSwitch.bind(this, item)}
												/>
												<span className="u-label__txt">线上</span>
											</label>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
				<div className="m-server__footer">
					<h5 className="u-ttl h5">data: (readonly) </h5>
					<div className="m-server__data">
						<textarea className="u-textarea" value={this.state.msgData} readOnly></textarea>
					</div>
				</div>
			</div>
		);
	}
}

export default Comp;
