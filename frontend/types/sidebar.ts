import { ReactNode } from "react"

export interface PropsSidebar {
  id: number
  icon: ReactNode
  text: string
  url: string
  action?: () => void
}