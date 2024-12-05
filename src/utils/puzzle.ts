import { GameConfig } from '../types/game';

interface PuzzleState {
  tiles: number[];
  emptyIndex: number;
  gridSize: number;
}

// Calculate Manhattan distance between two positions
const getManhattanDistance = (pos1: number, pos2: number, gridSize: number): number => {
  const row1 = Math.floor(pos1 / gridSize);
  const col1 = pos1 % gridSize;
  const row2 = Math.floor(pos2 / gridSize);
  const col2 = pos2 % gridSize;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

// Get target position for a tile (0-based)
const getTargetPosition = (value: number, gridSize: number): number => {
  return value === 0 ? gridSize * gridSize - 1 : value - 1;
};

// Check if puzzle is solvable
export const isSolvable = (tiles: number[], gridSize: number): boolean => {
  let inversions = 0;
  const numbers = tiles.filter(n => n !== 0);
  
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] > numbers[j]) inversions++;
    }
  }

  // For odd grid sizes, number of inversions must be even
  if (gridSize % 2 === 1) {
    return inversions % 2 === 0;
  }

  // For even grid sizes, inversions + row of empty space from bottom must be odd
  const emptyRow = Math.floor(tiles.indexOf(0) / gridSize);
  const rowFromBottom = gridSize - emptyRow;
  return (inversions + rowFromBottom) % 2 === 1;
};

// Generate a solvable puzzle
export const generatePuzzle = (config: GameConfig): number[] => {
  const { gridSize } = config;
  const size = gridSize * gridSize;
  let tiles: number[];

  do {
    tiles = Array.from({ length: size }, (_, i) => i);
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles, gridSize));

  return tiles;
};

// Check if move is valid
export const isValidMove = (index: number, emptyIndex: number, gridSize: number): boolean => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const emptyRow = Math.floor(emptyIndex / gridSize);
  const emptyCol = emptyIndex % gridSize;

  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  );
};

// Check if puzzle is solved
export const isPuzzleSolved = (tiles: number[], gridSize: number): boolean => {
  return tiles.every((tile, index) => 
    tile === (index + 1) % (gridSize * gridSize)
  );
};

// Calculate score multiplier based on moves and optimal solution
export const calculateMoveEfficiency = (
  moves: number, 
  gridSize: number, 
  difficulty: string
): number => {
  const optimalMoves = {
    easy: gridSize * 3,
    medium: gridSize * 4,
    hard: gridSize * 5
  }[difficulty];

  const efficiency = Math.max(0, Math.min(1, optimalMoves / moves));
  return 0.5 + (efficiency * 0.5); // Range: 0.5x - 1x
};

// Get hint for next move
export const getHint = (state: PuzzleState): number | null => {
  const { tiles, emptyIndex, gridSize } = state;
  let bestMove = null;
  let bestScore = Infinity;

  // Check all possible moves
  for (let i = 0; i < tiles.length; i++) {
    if (isValidMove(i, emptyIndex, gridSize)) {
      const targetPos = getTargetPosition(tiles[i], gridSize);
      const currentDist = getManhattanDistance(i, targetPos, gridSize);
      const newDist = getManhattanDistance(emptyIndex, targetPos, gridSize);

      // Prefer moves that bring tiles closer to their target positions
      if (newDist < currentDist && newDist < bestScore) {
        bestScore = newDist;
        bestMove = i;
      }
    }
  }

  return bestMove;
};