export const mapFetchAllPermissionsResponse = (data: any) => {
    return data["data"].map((item: any) => {
        return item['name']
    }) || []
}
