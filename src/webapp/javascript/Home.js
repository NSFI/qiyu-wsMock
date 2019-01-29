import React, {Component, Fragment} from 'react';
import { Radio, Checkbox, Input, Button } from 'antd';
import config from '../../config/base';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
class Comp extends Component {
	constructor() {
		super();
		
		this.state = {
			msgTypeMap: {},
			msgType: '',	// 消息类型
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
	doChangeType(ev){
		const type = ev.target.value;
		this.setState({
			msgType: type
		});
	}
	// 切换开关
	doChangeSwitch(msgType, e){
		let msgTypeMap = { ...this.state.msgTypeMap };
		msgTypeMap[msgType].switch = e.target.checked;
		this.setState({
			msgTypeMap: msgTypeMap
		});
		this.xhr('/switch', {
			method: 'POST',
			data: {
				msgType: msgType,
				switch: +e.target.checked
			}
		});
	}
	doSend(){
		this.xhr('/send',{
			method:'POST',
			data: {...this.state.msgTypeMap[this.state.msgType], msgType: this.state.msgType}
		});
	}
	onDataChange(key, ev) {
		let msgTypeMap = { ...this.state.msgTypeMap };
		msgTypeMap[this.state.msgType][key] = ev.target.value;
		this.setState({
			msgTypeMap: msgTypeMap
		});
	}
	xhr(url,option){
		const xhr = new XMLHttpRequest();
		const {method,mime,data,onload} = option;
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState == 4 && xhr.status == 200){
				onload && onload(xhr.responseText);
			}
		};
		xhr.open(method,'http://' + config.hostname + ':' + config.port + url);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(data));
	}
	render() {
		const { msgType, msgTypeMap } = this.state;
		const currentMsg = msgTypeMap[msgType] || {};
		return (
			<div className="m-server" id="root">
				<div className="m-server__header">
					<div className="m-server__header__main">
						<h2 className="u-ttl h3">W.S. Helper <span className="small">v0.0.1</span></h2>
					</div>
					<div className="m-server__header__side">
						<Button
							type="primary"
							disabled={!msgType}
							onClick={this.doSend.bind(this)}
						>Send Message</Button>
					</div>
				</div>
				<div className="m-server__bodyer">
					<div className="m-server__goods">
						<h5 className="u-ttl h5">消息类型</h5>
						<RadioGroup 
							className="m-server__glist" 
							value={msgType}
							onChange={this.doChangeType.bind(this)}
						>
							{
								Object.keys(msgTypeMap).map((key)=>{
									const item = msgTypeMap[key];
									return (
										<Radio 
											value={key} 
											key={key}
											style={{display:'block'}}
										>
											<span className="specType" title={item.desc}>{item.specType}</span>
											<label className="u-label">
												<Checkbox
													checked={!!item.switch}
													onChange={this.doChangeSwitch.bind(this, key)}
												>
													线上
												</Checkbox>
											</label>
										</Radio>
									)
								})
							}
						</RadioGroup>
					</div>
				</div>
				<div className="m-server__footer">
					<h5 className="u-ttl h5">消息内容</h5>
					<div className="m-server__data">
						<label>id</label>
						<span className="tip">（必须唯一，不填随机生成）</span>
						<Input
							value={currentMsg.id}
							disabled={!msgType}
							onChange={this.onDataChange.bind(this, 'id')}
						></Input>
						<label>from</label>
						<span className="tip">（消息来源，用于平台电商区分不同商户）</span>
						<Input 
							value={currentMsg.from}
							disabled={!msgType}
							onChange={this.onDataChange.bind(this, 'from')}
						></Input>
						<label>content</label>
						<span className="tip">（消息体，可编辑）</span>
						<TextArea 
							disabled={!msgType}
							value={currentMsg.content} 
							autosize 
							onChange={this.onDataChange.bind(this, 'content')}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Comp;
