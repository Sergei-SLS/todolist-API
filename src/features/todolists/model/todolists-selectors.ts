import type { RootState } from "@/app/store"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
