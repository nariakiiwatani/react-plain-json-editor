
import React, { useState } from 'react'
// This import is only for this demo to use the newest version.
import { PlainJsonEditor } from '../../../dist/PlainJsonEditor'
// you would do `npm i plain-json-editor` and import it
// import { PlainJsonEditor } from 'plain-json-editor'

const App = () => {
	const [status, setStatus] = useState("")
	const handleChange = (result: {}) => {
		setStatus(`onChange: ${JSON.stringify(result, null, 2)}`)
	}
	const handleSubmit = (result: {}) => {
		setStatus(`onSubmit: ${JSON.stringify(result, null, 2)}`)
	}
	return (
		<>
			<div>Type something in the textarea below and you will see the results</div>
			<div>Submit key: Command+Enter or Ctrl+Enter</div>
			<div>{status}</div>
			<PlainJsonEditor
				value={{}}
				onChange={handleChange}
				onSubmit={handleSubmit}
			//	error=""
			//	showInnerError={true}
			//	submitKeys={["command+enter", "ctrl+enter"]}
			//	serializer={JSON.parse}
			//	deserializer={json => { return JSON.stringify(json, null, 2) }}
			//	formatAfterSubmit={true}
			//	styles={{}}
			/>
		</>
	)
}

export default App;
