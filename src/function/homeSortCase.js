export const homeSortCase = (setSort, sort,setCases,cases) => {
	const sortCase = () => {
			setSort(!sort);
			if (!sort) {
				setCases(
					cases.toSorted((a, b) => a.content.localeCompare(b.content))
				);
			}
		};
		return {sortCase}
}
