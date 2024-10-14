import PageProtection from "@/components/PageProtection";
import MainSidebar from "@/components/MainSidebar";
import styles from "./layout.module.css"

export default function MainLayout({ children }) {

    return (
        <>
            <div className={styles.wrapper}>
                <PageProtection/>
                <MainSidebar/>
                <section className={styles.mainSection}>
                    { children }
                </section>
            </div>
        </>
    )
}
