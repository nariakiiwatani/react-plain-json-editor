# react-plain-json-editor

It provides simple JSON editor for React.  
[live demo](https://nariakiiwatani.github.io/react-plain-json-editor/)  

you can use this either as a Component(PlainJsonEditor) or as a Hook(useJsonEditor).

# Install
`npm i react-plain-json-editor`  
or  
`yarn add react-plain-json-editor`

# How to use

## PlainJsonEditor

_note: all properties are optional._
```tsx
<PlainJsonEditor
	// initial JSON content of the editor. provide it as an object.
	// default: {}
	value={{initial:"value"}}
	// fires every time it successfully parsed into a JSON value.
	// default: empty function
	onChange={handleChange}
	// fires when submit key pressed and successfully parsed.
	// default: empty function
	onSubmit={handleSubmit}
	// trigger keys to emit 'onSubmit'.
	// you can set any combinations of keys that are provided in [Hotkeys.js](https://wangchujiang.com/hotkeys/).
	// default: ["command+enter", "ctrl+enter"]
	submitKeys={["command+s"]}
	//　error string to show if you have any.
	// default: ""
	error=""
	// whether shows inner error(most of the cases it's a parsing error) or not.
	// default: true
	showInnerError={true}
	// custom serialize(string=>JSON) function if you have any.
	// default: JSON.parse
	serializer={JSON.parse}
	// custom deserialise(JSON=>string) function if you have any.
	// default: JSON.stringify(json, null, 2)
	deserializer={json => { return JSON.stringify(json, null, 2) }}
	// format(serialise=>deserialise=>setText) text in the editor after submitting.
	// default: true
	formatAfterSubmit={true}
	// customize styles of each inner element.
	// you can specify "root", "textarea", and "error".
	// if you set the styles, they are merged into default styles(see src/PlainJsonEditor.tsx).
	// default: {}
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
/>
```

PlainJsonEditor is enough but if you want to use it more (more!) simple way, there is a hook style `useJsonEditor` for you.

## useJsonEditor

This is useful especially the cases that...
- you want to have full accessibility of `textarea`
- you want to handle inner(parsing) error by yourself

_note: all properties are optional._

```tsx
function YourComponent = () => {
	// useJsonEditor returns a ref so that you can bind it with your `textarea` element.
	const editorRef = useJsonEditor = ({
		onSubmit = {handleSubmit},
		onError = {handleError},
		// submitKeys = ['command+enter', 'ctrl+enter'],
		// serializer = JSON.parse
	})
	return (
		<textarea
			// bind useJsonEditor hook with an element
			ref={editorRef}
			// if you need onChange event, you can pass it as usual
			onChange={handleChange}
			// other properties are of course valid because it is a normal textarea
			// value=""
		/>
	)
}
```