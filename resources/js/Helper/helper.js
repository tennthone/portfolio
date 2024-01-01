export const  getTrimPath = (path) => {
    const prefix = "app/public/resources/";
    const trimmedPath = path.replace(new RegExp(`^${prefix}`), '');
    const pathParts =   trimmedPath.split('/');
    const result = pathParts.reduce((acc, part, index) => {
        const currentPath = pathParts.slice(0, index + 1).join('/');
        acc[part] = `${prefix}${currentPath}`;
        return acc;
    }, []);

    return result;
}