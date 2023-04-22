export const replaceParam = (text: string, parameters: {}) => text.replaceAll(/@(\w+)\$/g, (match, group) => {
    const value = parameters[group];
    return value;
})