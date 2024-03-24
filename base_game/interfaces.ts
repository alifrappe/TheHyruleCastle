//interface pour personnage
export interface Rarity {
  rarity: number;
  probability: number;
}

export interface Character {
  id: number;
  name: string;
  hp: number;
  mp: number;
  str: number;
  int: number;
  def: number;
  res: number;
  spd: number;
  luck: number;
  race: number;
  class: number;
  rarity: number;
}

export interface currentPlayer {
  name: string;
  maxhp: number;
  currenthp: number;
  str: number;
}
