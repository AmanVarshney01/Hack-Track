import "server-only"
import { getProjectOwner, getUser } from "./queries"

export async function isProjectOwner(projectId: number) {
    const projectOwner = await getProjectOwner(projectId);
    const user = await getUser()

    if (projectOwner.data.created_by !== user.id) {
        return false
    }

    return true
}