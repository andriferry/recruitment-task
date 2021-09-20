export interface ParamsData {
  limit: number
  platforms?: string
  keywords?: string
  budgetGreaterEqual?: number | undefined
  budgetLowerEqual?: number | undefined
  olderThanId?: string
  newerThanId?: string
  skip?: number | undefined
}
