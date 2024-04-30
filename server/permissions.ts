import "server-only"
import { getProjectOwner, getProjectTaskOwner, getUser } from "./queries"

export async function isProjectOwner(projectId: number) {
    const projectOwner = await getProjectOwner(projectId);
    const user = await getUser()

    if (projectOwner.data.created_by !== user.id) {
        return false
    }

    return true
}

export async function isProjectTaskOwner(taskId: number) {
    const taskOwner = await getProjectTaskOwner(taskId);
    const user = await getUser()

    if (taskOwner.data.created_by !== user.id) {
        return false
    }

    return true
}