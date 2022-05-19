import { Exercice } from "./exercice";
import { ExerciceSetProgress } from "./exerciceSetProgress";
import { User } from "./user";

export enum ExerciceSetType {
  CHALLENGE = 'challenge',
  PRACTICE = 'practice',
}

export interface ExerciceSet {
  id: number;
  name: string;
  description: string;
  image: string;
  type: ExerciceSetType;
  creatorId?: number;
  creator?: User;
  exercices?: Exercice[];
  progress?: ExerciceSetProgress[];
}
