import PageProtection from "@/components/PageProtection";

export default function MainLayout({ children }) {

    return (
        <>
            <PageProtection/>
            { children }
        </>
    )
}
