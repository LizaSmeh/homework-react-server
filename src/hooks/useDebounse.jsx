import { useState, useEffect } from "react"

export const useDebounseSearch = (value, delay) => {
		const [debounseValue, setDebounseValue] = useState(value)
		useEffect (() => {
			const handler = setTimeout( () => {
				setDebounseValue(value)
			}, delay)

			return () => clearTimeout(handler)

		}, [value])

		return debounseValue
	}
