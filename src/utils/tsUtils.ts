export function raise(error: Error): never {
    throw error
}

export function notNull<T>(value: T): value is NonNullable<T> {
    return value != null
}
