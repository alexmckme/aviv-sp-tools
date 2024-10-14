"use client"
import React from "react"
import Link from "next/link"
import styles from "./NavigationMenu.module.css"


function NavigationMenu({linksObject}) {

    // const mainCategory = {label: "Coeffective", href: "/coeffective"}
    // const subCategories= [{label: "Nouvel import d'extract", href: "/main/coeffective/new"},
    //     {label: "Configuration Token Tableau", href: "/main/coeffective/manage-tableau-token"}]

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainLinkContainer}>
                <Link className={styles.links}
                      href={linksObject.mainCategory.href}>{linksObject.mainCategory.googleIcon && <span className="material-symbols-outlined">
{linksObject.mainCategory.googleIcon}
</span>}{linksObject.mainCategory.label}</Link>
                <button onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                }}>
                    {linksObject.subCategories && <span
                        className="material-symbols-outlined">{isDropdownOpen ? "arrow_drop_up" : "arrow_drop_down"}</span>}
                </button>
            </div>
            {linksObject.subCategories && <div
                className={`${styles.sublinksContainer} ${isDropdownOpen ? styles.containerOpen : styles.containerClosed}`}>
                {linksObject.subCategories.map((item, i) => (
                    <Link className={styles.sublinks} href={item.href} key={i}>{item.label}</Link>
                ))}
            </div>}
            <hr/>
        </div>
    );
}

export default NavigationMenu;
