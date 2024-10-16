import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./loading.module.css"

export default function MainLoading() {
    return (
        <div className={styles.loadingWrapper}>
            <LoadingSpinner/>
        </div>
    )
}