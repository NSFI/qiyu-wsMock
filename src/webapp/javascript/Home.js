import React, {Component, Fragment} from 'react';

class Comp extends Component {
	constructor() {
		super();
		
		this.state = {
			platformList:[
				{
					id:0,
					type:'visitor',
					label:'visitor',
					checked:1
				},
				{
					id:1,
					type:'kefu',
					label:'kefu',
					checked:0
				}
			],
			msgTypeList:[
				{
					id:0,
					type:'text',
					label:'text',
					checked: 1
				},
				{
					id:1,
					type:'image',
					label:'image',
					checked: 0
				},
				{
					id:65,
					type:'custom',
					label:'custom',
					checked: 0
				}
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
	doSend(){
		this.setState({
			msgData:{
				platform: this.state.platform,
				msgType: this.state.msgType
			}
		},()=>{
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = ()=>{
				if(xhr.status == 200){
					console.log('send success!')
				}
			};
			xhr.open('POST','http://127.0.0.1:3000/send');
			xhr.setRequestHeader('Content-type','application/json');
			xhr.send(JSON.stringify(this.state.msgData));
		})
	}
	render() {
		return (
			<div className="m-server" id="root">
				<div className="m-server__header">
					<div className="m-server__header__main">
						<h2 className="u-ttl h2">W.S. Helper <span className="small">v0.1.0</span></h2>
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
											<span className="u-label__txt">{item.type}</span>
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
												<span className="u-label__txt">{item.type}</span>
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
