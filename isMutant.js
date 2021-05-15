module.exports = (dna) => {
  //convert to matrix
  if (dna.some((x) => x.length !== dna.length)) {
    throw Error("Invalid data");
  }
  const board = dna.map((x) => x.split("").map((y) => y));
  let found = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const currentChar = board[i][j];
      if (findDNAString(board, i, j, i, j, 0, currentChar)) {
        found++;
        if (found === 2) {
          return true;
        }
      }
    }
  }

  return false;
};

const findDNAString = (
  board,
  old_row,
  old_col,
  actual_row,
  actual_col,
  targetFound,
  nextLetter
) => {
  // if found then pattern
  if (targetFound === 4) return true;

  //if indexes are outside board or the letter is not equal to de founding letter, exit
  if (
    actual_row < 0 ||
    actual_row >= board.length ||
    actual_col < 0 ||
    actual_col >= board.length ||
    board[actual_row][actual_col] !== nextLetter
  )
    return false;

  let result = false;

  if (targetFound > 0) {
    //I have to keep the previous direction
    const toRow = actual_row - old_row;
    const toCol = actual_col - old_col;
    result = findDNAString(
      board,
      actual_row,
      actual_col,
      actual_row + toRow,
      actual_col + toCol,
      targetFound + 1,
      nextLetter
    );
  } else {
    result =
      findDNAString(
        board,
        old_row,
        old_col,
        actual_row - 1,
        actual_col + 1,
        1,
        nextLetter
      ) || //top right diag.
      findDNAString(
        board,
        old_row,
        old_col,
        actual_row,
        actual_col + 1,
        1,
        nextLetter
      ) || //right
      findDNAString(
        board,
        old_row,
        old_col,
        actual_row + 1,
        actual_col + 1,
        1,
        nextLetter
      ) || //bottom left rigth
      findDNAString(
        board,
        old_row,
        old_col,
        actual_row + 1,
        actual_col,
        1,
        nextLetter
      ); //left
  }

  return result;
};
