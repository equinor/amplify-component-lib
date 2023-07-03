import { vi } from "vitest"


const useSearchParams = () => {
    class searchParams implements URLSearchParams {
        size = 0;

        [Symbol.iterator](): IterableIterator<[string, string]> {
            throw new Error("Method not implemented.")
        }

        append(name: string, value: string): void {
            throw new Error("Method not implemented.")
        }

        getAll(name: string): string[] {
            throw new Error("Method not implemented.")
        }

        has(name: string): boolean {
            throw new Error("Method not implemented.")
        }

        sort(): void {
            throw new Error("Method not implemented.")
        }

        toString(): string {
            throw new Error("Method not implemented.")
        }

        forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void {
            throw new Error("Method not implemented.")
        }

        entries(): IterableIterator<[string, string]> {
            throw new Error("Method not implemented.")
        }

        keys(): IterableIterator<string> {
            throw new Error("Method not implemented.")
        }

        values(): IterableIterator<string> {
            throw new Error("Method not implemented.")
        }
        
        get (id: string) {
            return (this as any)?.[id] ?? null
        }


        set(id: string, value: any) {
                (this as any)[id] = value
        }

        delete(id: string) {
            delete (this as any)?.[id]
        }
    }

    const setSearchParams = (value: any) => {
        console.log("Set search params ran", value)
    }

    return [searchParams, setSearchParams]
}

vi.mock("react-router-dom", () => { 
    return { useSearchParams }
})