interface SelectOptionItem {
	value: string
	label: string
	[key: string]: unknown
}
function convertToSelectOptionItem<T>(
	input: T,
	valueKey: keyof T,
	labelKey: keyof T
): SelectOptionItem {
	return {
		...input,
		value: String(input[valueKey]),
		label: String(input[labelKey]),
	}
}

export function convertToSelectOptionItems<T>(
	input: T[],
	valueKey: keyof T,
	labelKey: keyof T
): SelectOptionItem[] {
	return input.map((item) =>
		convertToSelectOptionItem(item, valueKey, labelKey)
	)
}
