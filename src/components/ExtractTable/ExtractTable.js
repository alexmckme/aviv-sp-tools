import React from 'react';
import ExtractRow from "@/components/ExtractRow";
import styles from "./ExtractTable.module.css";

function ExtractTable({ gsheetFile, gsheetExtractsList }) {


  return (
      <tr>
        <td colSpan={5} className={styles.tdWrapper}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th scope="col">Date de création</th>
              <th scope="col">Lien onglet</th>
              <th scope="col">Type</th>
              <th scope="col">Extract ID</th>
              <th scope="col">Fréquence de refresh</th>
              <th scope="col">Heure début</th>
              <th scope="col">Heure fin</th>
              <th scope="col">Date dernier refresh</th>
              {/*<th scope="col">Modifier</th>*/}
              <th scope="col">Supprimer</th>
            </tr>
            </thead>

            <tbody>
            {gsheetExtractsList.map((extract) => {

              const extractCreationDate = extract.created_at
              const parsedExtractCreationDate = new Date(extractCreationDate)
              const formattedExtractCreationDate = parsedExtractCreationDate.toLocaleString("fr-FR", {timeZone: "Europe/Paris"})

              const lastRefreshDate = extract.last_refresh
              const parsedLastRefreshDate = new Date(lastRefreshDate)
              let formattedLastRefreshDate = parsedLastRefreshDate.toLocaleString("fr-FR", {timeZone: "Europe/Paris"})

              if (!lastRefreshDate) {
                formattedLastRefreshDate = "Jamais"
              }

              return (
                  <ExtractRow key={Math.random()} formattedExtractCreationDate={formattedExtractCreationDate} gsheetFile={gsheetFile} extract={extract} formattedLastRefreshDate={formattedLastRefreshDate}/>
              )
            })}
            </tbody>
          </table>
        </td>
      </tr>
  );
}

export default React.memo(ExtractTable);
