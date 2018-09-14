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
				{
					id:'kefu',
					checked:0
				}
			],
			msgTypeList:[
				{
					id:'text',
					checked: 1
				},
				{
					id:'image',
					checked: 0
				},
				{
					id:'onconnect',
					checked: 0
				},
				{
					id:'onkefu',
					checked: 0,
					switch: 0	// 0mock,1online
				},
				{
					id:'rich',
					checked: 0
				},
			],
			platform:0,	// 平台类型
			msgType: 0,	// 消息类型
			// 上报实体
			msgData:{}
		};
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
	doChangeType(index,id,e){
		let list = [...this.state.msgTypeList];
		list.map((item)=>{
			if(item.id == id){
				item.checked = 1;
				this.setState({
					msgType: item.id
				})
			}else{
				item.checked = 0;
			}
		});
		this.setState({
			msgTypeList : list
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
			msgData:{
				platform: this.state.platform,
				msgType: this.state.msgType
			}
		},()=>{
			this.xhr('/send',{
				method:'POST',
				data:this.state.msgData
			});
		})
	}
	xhr(url,option){
		const xhr = new XMLHttpRequest();
		const {method,mime,data} = option;
		xhr.onreadystatechange = ()=>{
			if(xhr.status == 200){
				console.log(url+'send success!')
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
								this.state.msgTypeList.map((item,index)=>{
									return (
										<li key={item.id}>
											<label className="u-label">
												<input className="u-cb" type="radio" name="goods" defaultChecked={!!item.checked}
													   onClick={this.doChangeType.bind(this,index,item.id)}
												/>
												<span className="u-label__txt">{item.id}</span>
											</label>
											<label className="u-label">
												<input className="u-cb" type="checkbox" name="switch" defaultChecked={!!item.switch}
													   onClick={this.doChangeSwitch.bind(this,index,item.id)}
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
						<textarea className="u-textarea" value={JSON.stringify(this.state.msgData)} readOnly></textarea>
					</div>
				</div>
			</div>
		);
	}
}

export default Comp;
