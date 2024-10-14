"use client"
import React from 'react';
import Link from "next/link";
import styles from "./MainSidebar.module.css"
import NavigationMenu from "@/components/NavigationMenu";
import Image from "next/image";
import LogOutButton from "@/components/LogOutButton";
import {coeffectiveLinks, customerSupportLinks, cashCollectionLinks} from "@/app/(protected)/main/links";

function MainSidebar() {

    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);



    return (
        <>

            <button className={styles.sidebarToggle} onClick={() => {
                setIsMobileNavOpen(!isMobileNavOpen);
            }}>
                    <span
                        className={`material-symbols-outlined ${isMobileNavOpen && styles.openedSidebarToggle}`}>{isMobileNavOpen ? "close" : "menu"}</span>
            </button>
            <div className={styles.header}>
                <Link href="/main"><Image src="/logo-brand-main.svg" width={200}
                                                                               height={50}
                                                                               alt="Aviv BP Helper official logo"/></Link>
            </div>

            <nav className={`${styles.navigationBar} ${isMobileNavOpen ? styles.navOpen : styles.navClosed}`}>
                <div>
                    <div className={styles.emptySpaceTop}></div>
                    <div><Link className={styles.links} href={"/main"}><Image src="/logo-brand-white.svg" width={200}
                                                                              height={50}
                                                                              alt="Aviv BP Helper official logo"/></Link>
                    </div>
                    <hr/>


                    <NavigationMenu linksObject={coeffectiveLinks}/>
                    <NavigationMenu linksObject={customerSupportLinks}/>
                    <NavigationMenu linksObject={cashCollectionLinks}/>


                </div>
                <div className={styles.footer}>
                    <LogOutButton className={styles.logOutButton}/>
                </div>
            </nav>

        </>
    );
}

export default MainSidebar;
