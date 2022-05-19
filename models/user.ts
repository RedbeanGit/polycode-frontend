import { Exercice } from "./exercice";
import { ExerciceSet } from "./exerciceSet";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isVerified: boolean;
  lastLogin: Date;
  isAdmin: boolean;
  exercicesCreated?: Exercice[];
  exerciceSetsCreated?: ExerciceSet[];
}