
import React, { useState } from 'react'
import { PlainJsonEditor } from 'react-plain-json-editor'

const App = () => {
	const [style, setStyle] = useState<{}>({
		backgroundColor: "#FFF",
		width: "100vw",
		height: "100vh"
	})
	const [result, setResult] = useState(style)
	const handleChange = (result: {}) => {
		setResult(result)
	}
	const handleSubmit = (result: {}) => {
		setStyle(result)
	}
	return (
		<div style={style}>
			<h1>PlainJsonEditor Demo</h1>
			<div><a href="https://github.com/nariakiiwatani/react-plain-json-editor">GitHub</a></div>
			<div>You can write something into the textarea and it will be automatically parsed to JSON.<br />
				In this demo you can edit this page's style(CSS).</div>
			<p>Submit key: Command+Enter or Ctrl+Enter</p>
			<p>{`current result: ${JSON.stringify(result)}`}</p>
			<PlainJsonEditor
				value={style}
				onChange={handleChange}
				onSubmit={handleSubmit}
				styles={{
					textarea: {
						backgroundColor: "rgba(0,0,0,0.8)",
						color: "#CFF",
						padding: 12,
						fontSize: "1.2rem",
						lineHeight: "1.5rem",
						fontFamily: "monospace"
					}
				}}
			//	error=""
			//	showInnerError={true}
			//	submitKeys={["command+enter", "ctrl+enter"]}
			//	serializer={JSON.parse}
			//	deserializer={json => { return JSON.stringify(json, null, 2) }}
			//	formatAfterSubmit={true}
			/>
		</div>
	)
}

export default App;
