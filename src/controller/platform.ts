//import dataModel from "@/components/task-search/tasks-data-model";


export default function usePlatform() {
    const createdPlatformValue = (platformValue: string) => platformValue.toLowerCase();



    return {createdPlatformValue}
}