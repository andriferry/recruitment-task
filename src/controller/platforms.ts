import fetch from '@/components/task-search/get-taks'
export default function usePlatform() {
  const { getTasks } = fetch()

  const sortingByPlatform = (limit: number, platform: string) =>
    getTasks({ limit: limit, platforms: platform })

  const customValuePlatform = (value: string) => value.toLowerCase()

  const removeDuplicatePlatform = (allPlatforms: any, platform: [string]) => {
    allPlatforms.push(...new Set(platform))
  }

  const getPlatform = (allPlatforms: any, allTasks: any) => {
    const getDataPlatform = allTasks.value.map((element: any) =>
      element.platforms.flat()
    )

    removeDuplicatePlatform(allPlatforms, getDataPlatform.flat())
  }

  return { getPlatform, customValuePlatform, sortingByPlatform }
}
