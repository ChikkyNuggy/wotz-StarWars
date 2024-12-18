import { myAxios } from '@/instances/myAxios'
import type { AxiosResponse } from 'axios'
import type { Character, APIResponse } from '@/types/type'

export const getCharacters = async (): Promise<AxiosResponse> => {
  return myAxios.get<APIResponse<Character[]>>('/all.json')
}

export const getCharacter = async (id: string): Promise<AxiosResponse> => {
  return myAxios.get<APIResponse<Character>>(`/id/${id}.json`)
}
