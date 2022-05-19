import { ExerciceProgress } from "./exerciceProgress";
import { User } from "./user";

export enum Language {
  Javascript = 'javascript',
  Python = 'python',
  Java = 'java',
  Rust = 'rust',
}

export interface Exercice {
  id: number;
  name: string;
  statement: string;
  baseEditorContent: string;
  creatorId?: number;
  creator?: User;
  progress?: ExerciceProgress;
  exerciceSetId?: number;
}