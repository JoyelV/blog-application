"use client"

import { Input } from "@/app/Components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [text, setText] = useState(searchParams.get("search") || "")
    const [query] = useDebounce(text, 500)

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (query) {
            params.set("search", query)
        } else {
            params.delete("search")
        }
        router.replace(`/?${params.toString()}`, { scroll: false })
    }, [query, router, searchParams])

    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="pl-9 rounded-full bg-background border-muted-foreground/20 focus-visible:ring-primary/20"
                placeholder="Search for articles..."
            />
        </div>
    )
}
