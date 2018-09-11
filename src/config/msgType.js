module.exports = {
	0: {
		type: 'text',
		content: 'this is text'
	},
	1: {
		type: 'image',
		content: JSON.stringify({
			url:'https://socket.io/images/mixmax.png'
		})
	},
	2: {
		type: 'file',
		content: JSON.stringify({
			url:'https://socket.io/images/mixmax.png'
		})
	},
	10: {
		type: 'custom',
		content: JSON.stringify({
			cmd:65,
			content:'<ul><li>1</li><li>2</li></ul>'
		})
	}
};
