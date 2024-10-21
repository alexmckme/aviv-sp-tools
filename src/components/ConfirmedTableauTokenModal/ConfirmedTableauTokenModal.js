"use client"
import React from 'react';
import styles from "./ConfirmedTableauTokenModal.module.css"
import {RemoveScroll} from 'react-remove-scroll';
import Link from "next/link";

function ConfirmedTableauTokenModal({ status, setStatus }) {

  function handleClick(event) {
    event.preventDefault()
    setStatus("idle")
  }

  return (
      <>
        {
            (status === "success") &&
            <RemoveScroll>
              <div className={styles.bg}></div>
              <div className={styles.wrapper}>
                <h2>Configuration du token réussie 🎉</h2>
                <p>Vous pouvez désormais importer votre source de données Flamingo <Link href="/main/coeffective/new">ici</Link>.</p>
                <div>
                  <div>
                    <button className={styles.confirmButton} onClick={handleClick}>D'accord</button>
                  </div>
                </div>
              </div>
            </RemoveScroll>
        }
        {
            (status === "error") &&
            <RemoveScroll>
              <div className={styles.bg}></div>
              <div className={styles.wrapper}>
                <h2>Une erreur s'est produite 🤔</h2>
                <p>Ce n'est sûrement pas vous, c'est certainement nous. Veuillez réessayer.</p>
                <div>
                  <button className={styles.confirmButton} onClick={handleClick}>Réessayer</button>
                </div>
              </div>
            </RemoveScroll>
        }
      </>
  );
}

export default ConfirmedTableauTokenModal;
