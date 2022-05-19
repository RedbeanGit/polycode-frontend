import { ApiResponse, getRequest, postRequest } from '.';
import { Exercice, Language } from '../../models/exercice';
import { PaginatedRequest, PaginatedResponse } from '../pagination';

export interface TestExerciceRequest {
  language: Language;
  editorContent: string;
}

export async function getExercices(
  paginationOpts?: PaginatedRequest
): Promise<ApiResponse<PaginatedResponse<Exercice>>> {
  return await getRequest<PaginatedResponse<Exercice>>('/exercices', paginationOpts, true);
}

export async function getExercice(id: number): Promise<ApiResponse<Exercice>> {
  return await getRequest<Exercice>(`/exercices/${id}`, {}, true);
}

export async function testExercice(id: number, request: TestExerciceRequest): Promise<ApiResponse<{
  success: boolean;
  stdout: string;
  stderr: string;
}>> {
  return await postRequest<{
    success: boolean;
    stdout: string;
    stderr: string;
  }>(`/exercices/${id}/test`, request, true);
}
