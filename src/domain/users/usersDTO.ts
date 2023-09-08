export const mapFetchUsersResponse = (response: any) => {
    return response["data"].map((user: any) => {
        const roles = user["roles"].map((item: any) => {
            return {
                id: item["id"],
                name: item["name"],
            }
        }) || []

        return {
            id: user["id"],
            name: user['name'],
            email: user['email'],
            emailVerified: user['email_verified_at'],
            create: user['created_at'],
            avatar: user['avatar'],
            roles: roles
        }
    })
}

export const mapFetchUserResponseId = (data: any) => {
    const roles = data.roles.map((item: any) => {
        return item['name']
    }) || []

    return {
        id: data["id"],
        name: data['name'],
        email: data['email'],
        fullName: data['full_name'],
        emailVerified: data['email_verified_at'],
        create: data['created_at'],
        avatar: data['avatar'],
        roles
    }
}
export const mapFetchUsersPaginationResponse = (response: any) => {
    return {
        totalPages: response['last_page'],
        page: response['current_page'],
        totalPerPage: response['per_page']
    } || []
}