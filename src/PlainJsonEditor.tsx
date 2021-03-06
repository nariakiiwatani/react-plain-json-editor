import React, { useState, useCallback, useMemo, CSSProperties, useEffect } from 'react'
import { useJsonEditor } from "./useJsonEditor";

type PlainJsonEditorProps = {
	value: {},
	onChange: (_: {}) => void,
	onSubmit: (_: {}) => void,
	error: string,
	showInnerError: boolean,
	submitKeys: string[],
	serializer: (_: string) => {},
	deserializer: (_: {}) => string,
	formatAfterSubmit: boolean,
	onSerializeError: (e: Error) => void,
	styles: {
		root?: {},
		textarea?: {},
		error?: {}
	}
}

export const PlainJsonEditor = (props: PlainJsonEditorProps) => {
	const { value, onChange, onSubmit, error, showInnerError,
		submitKeys, serializer, deserializer, formatAfterSubmit,
		onSerializeError,
		styles } = props

	const [text, setText] = useState(() => deserializer(value))
	const [errorText, setErrorText] = useState(error)
	useEffect(() => {
		setErrorText(error)
	}, [error])
	const clearErrorText = useCallback(() => {
		setErrorText("")
	}, [setErrorText])

	const handleChange = useCallback(e => {
		const v = e.target.value
		setText(v)
		try {
			onChange(serializer(v))
			showInnerError && clearErrorText()
		}
		catch (e) {
			onSerializeError(e)
			showInnerError && setErrorText(`${e.name}:${e.message}`)
		}
	}, [setText, serializer])

	const handleSubmit = useCallback((result: {}) => {
		try {
			onSubmit(result)
			if (formatAfterSubmit) {
				setText(deserializer(result))
			}
			showInnerError && clearErrorText()
		}
		catch (e) {
			showInnerError && setErrorText(`${e.name}:${e.message}`)
		}
	}, [onSubmit, text])

	const ref = useJsonEditor({
		onSubmit: handleSubmit,
		onError: (e: Error) => { showInnerError && setErrorText(`${e.name}:${e.message}`) },
		submitKeys,
		serializer
	})

	const mergedStyles = useMemo(() => ({
		root: {
			width: "100vw",
			height: "50vh",
			...styles.root
		} as CSSProperties,
		textarea: {
			backgroundColor: "rgba(255,255,255,0.5)",
			width: "100%",
			height: "100%",
			...styles.textarea
		} as CSSProperties,
		error: {
			position: "absolute",
			backgroundColor: "rgba(100,100,100,0.75)",
			borderRadius: "12px",
			padding: "12px",
			color: "white",
			transform: "translate(-50%,-50%)",
			top: "50%",
			left: "50%",
			...styles.error
		} as CSSProperties
	}), [styles])

	return (
		<div style={mergedStyles.root}>
			<textarea ref={ref} style={mergedStyles.textarea} value={text} onChange={handleChange} />
			{errorText && <div style={mergedStyles.error}>{errorText}</div>}
		</div >
	)
}

PlainJsonEditor.defaultProps = {
	value: {},
	onChange: (_: {}) => { },
	onSubmit: (_: {}) => { },
	error: "",
	showInnerError: true,
	submitKeys: ['command+enter', 'ctrl+enter'],
	serializer: JSON.parse,
	deserializer: (json: {}) => JSON.stringify(json, null, 2),
	formatAfterSubmit: true,
	onSerializeError: (e: Error) => { },
	styles: {}
};