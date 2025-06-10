import { ResultCode } from "@/common/enums/enums.ts"

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  data: T
  resultCode: ResultCode
  messages: string[]
  fieldsErrors: FieldError[]
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
