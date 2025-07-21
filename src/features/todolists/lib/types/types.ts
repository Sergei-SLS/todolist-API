import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { RequestStatus } from "@/common/types"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
