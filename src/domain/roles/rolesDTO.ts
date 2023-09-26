export const mapFetchRolesResponse = (data: any) => {
    return data["data"].map((item: any) => {
        return {
            id: item['id'],
            name: item['name'],
            guard_name: item['guard_name'],
            created_at: item['created_at'],
            updated_at: item['updated_at'],
        }
    }) || []
}
export const mapFetchAllRolesResponse = (data: any) => {
    const roles = data["data"].map((item: any) => {
        return {
            id: item['id'],
            name: item['name'],
        }
    }) || []


    return roles;

}
export const mapFetchRolesResponseId = (data: any) => {
    const permissions = data.role_permissions.map((item: any) => {
        return item['name']
    }) || []

    return {
        name: data.role["name"],
        permissions
    }
}
export const mapFetchRolesPaginationResponse = (response: any) => {
    return {
        totalPages: response['last_page'],
        page: response['current_page'],
        totalPerPage: response['per_page']
    } || []
}