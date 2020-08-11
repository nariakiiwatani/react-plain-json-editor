import React, { useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export const useJsonEditor = ({
	onSubmit = (_: {}) => { },
	onError = (_: Error) => { },
	submitKeys = ['command+enter', 'ctrl+enter'],
	serializer = JSON.parse
}): React.MutableRefObject<HTMLTextAreaElement | null> => {
	const handleSubmit = useCallback((e: KeyboardEvent) => {
		const value = (e.target as HTMLTextAreaElement).value
		try {
			const serialized = serializer(value)
			onSubmit(serialized)
		}
		catch (e) {
			onError(e)
		}
	}, [serializer, onSubmit, onError])

	const ref = useHotkeys<HTMLTextAreaElement>(["tab", ...submitKeys].join(','), (e, handler) => {
		e.preventDefault()
		const target = ref.current
		if (!target) return
		if (submitKeys.some(key => key === handler.key)) {
			handleSubmit(e);
		}
		else {
			switch (handler.key) {
				case "tab":
					target.setRangeText("\t")
					target.selectionStart += 1
					break
			}
		}
	}, { enableOnTags: ['TEXTAREA'] }, [handleSubmit, submitKeys])

	return ref
}
