export function safeString(value: string | null | undefined): string | null {
    if (value == null || value.trim() === '') return null;

    return value.trim();
}
