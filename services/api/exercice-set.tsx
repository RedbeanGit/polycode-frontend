import { ApiResponse, getRequest } from '.';
import { ExerciceSet, ExerciceSetType } from '../../models/exerciceSet';
import { PaginatedRequest, PaginatedResponse } from '../pagination';

export async function getExerciceSets(
  paginationOpts?: PaginatedRequest,
  type?: ExerciceSetType,
): Promise<ApiResponse<PaginatedResponse<ExerciceSet>>> {
  return await getRequest<PaginatedResponse<ExerciceSet>>('/exercice-sets', { ...paginationOpts, type }, true);
}

export async function getExerciceSet(id: number): Promise<ApiResponse<ExerciceSet>> {
  return await getRequest<ExerciceSet>(`/exercice-sets/${id}`, {}, true);
}

export async function getSpotlightExerciceSet(): Promise<ApiResponse<ExerciceSet>> {
  return await getRequest<ExerciceSet>('/exercice-sets/spotlight', {}, true);
}

export async function getExerciceSetProgress(id: number): Promise<ApiResponse<number>> {
  return await getRequest<number>(`/exercice-sets/${id}/progress`, {}, true);
}
