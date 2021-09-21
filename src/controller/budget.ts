import fetch from '@/components/task-search/get-taks'

export default function useBudget() {
  const { getTasks } = fetch()

  const formatBudget = (value: number, currency: string, location: string) => {
    const numberObject = new Number(value)
    const myObj = {
      style: 'currency',
      currency: currency,
    }
    return numberObject.toLocaleString(location, myObj)
  }

  const queryGreaterBudget = (limit: number, budget: number) =>
    getTasks({ limit: limit, budgetGreaterEqual: budget })

  return { formatBudget, queryGreaterBudget }
}
