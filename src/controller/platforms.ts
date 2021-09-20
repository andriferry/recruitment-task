export default function usePlatform() {
  const removeDuplicatePlatform = (allPlatforms: any, platform: [string]) => {
    allPlatforms.push(...new Set(platform))
  }

  const getPlatform = (allPlatforms: any, allTasks: any) => {
    const getDataPlatform = allTasks.value.map((element: any) =>
      element.platforms.flat()
    )

    removeDuplicatePlatform(allPlatforms, getDataPlatform.flat())
  }

  return { getPlatform }
}
