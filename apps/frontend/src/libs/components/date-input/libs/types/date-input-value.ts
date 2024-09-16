type DateInputValuePiece = Date | null;

type DateInputValue =
	| [DateInputValuePiece, DateInputValuePiece]
	| DateInputValuePiece;

export { type DateInputValue };
