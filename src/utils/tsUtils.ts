export function raise(error: Error): never {
    throw error
}

export function notNull<T>(value: T): value is NonNullable<T> {
    return value != null
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null
}
