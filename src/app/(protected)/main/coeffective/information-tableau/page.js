import React from "react"
import styles from "./page.module.css"
import Link from "next/link";
import {
    getProtectedContentTemporary,
    getSignedURLImagesFromBucket
} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import parse from "html-react-parser"
import DOMPurify from "isomorphic-dompurify";

export default async function TableauInformationPage() {

    const dataPhotos = await getSignedURLImagesFromBucket("content-bucket", "tableau-configuration-guide")

    const contentGet = await getProtectedContentTemporary("content-bucket", "tableau-configuration-content/hiddenContent.json")
    const contentUrl = await contentGet.data[0].signedUrl
    const response = await fetch(contentUrl)
    const content = await response.json()

    function renderContent(content) {
        const sanitizedContent = DOMPurify.sanitize(content)
        const renderedContent = parse(sanitizedContent)
        return renderedContent
    }

    return (
        <section className={styles.wrapper}>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <h1>Coeffective - Guide d'utilisation des imports Flamingo</h1>

            {renderContent(content.introduction)}

            <div>
                {renderContent(content.part1)}

                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/I3.png').signedUrl}
                    alt={"sélection de l'anglais dans Tableau"}
                />

                {renderContent(content.part2)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/I4.png').signedUrl}
                    alt={"changement du repository Tableau"}
                />

                {renderContent(content.part3)}
            </div>


            <div>
                {renderContent(content.part4)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II1.png').signedUrl}
                    alt={"vérification de la requête dans Datagrip"}
                />

                {renderContent(content.part5)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II2.png').signedUrl}
                    alt={"sélection de la source de données dans Tableau"}
                />

                {renderContent(content.part6)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II3.png').signedUrl}
                    alt={"récupération des informations du service user"}
                />

                {renderContent(content.part7)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II4.png').signedUrl}
                    alt={"connexion Tableau Desktop à Athena"}
                />

                {renderContent(content.part8)}

                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II5.png').signedUrl}
                    alt={"sélection d'une table"}
                />

                {renderContent(content.part9)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II6.png').signedUrl}
                    alt={"renseignement de la requête dans Tableau"}
                />

                {renderContent(content.part10)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II7.png').signedUrl}
                    alt={"sélection du mode extract"}
                />

                {renderContent(content.part11)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II8.png').signedUrl}
                    alt={"enregistrement de la source de données Tableau en local"}
                />

                {renderContent(content.part12)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II9.png').signedUrl}
                    alt={"sélection de l'option de diffusion online"}
                />

                {renderContent(content.part13)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II10.png').signedUrl}
                    alt={"login Tableau Desktop"}
                />

                {renderContent(content.part14)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II11.png').signedUrl}
                    alt={"publication d'une source de données Tableau online"}
                />

                {renderContent(content.part15)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/II13.png').signedUrl}
                    alt={"sélection de la fréquence de refresh"}
                />

                {renderContent(content.part16)}
            </div>

            <div>
                {renderContent(content.part17)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/III2.png').signedUrl}
                    alt={"accès au profil utilisateur Tableau Online"}
                />

                {renderContent(content.part18)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/III3.png').signedUrl}
                    alt={"création d'un token Tableau"}
                />

                {renderContent(content.part19)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/III4.png').signedUrl}
                    alt={"nouveau token créé"}
                />

                {renderContent(content.part20)}
                <img
                    src={dataPhotos.data.find(element => element.path === 'tableau-configuration-guide/III5.png').signedUrl}
                    alt={"nom d'utilisateur Tableau"}
                />

                <p><strong>III.6)</strong> Vous pouvez désormais aller sur la page de <Link
                    href={"/main/coeffective/manage-tableau-token"}>gestion
                    du token Tableau</Link> et renseigner :

                    {renderContent(content.part21)}
                </p>

                <h3>Bravo ! Vous pouvez désormais <Link href={"/main/coeffective/new"}>configurer un
                    import</Link> “Flamingo” (qui en réalité est un import de Tableau). Vous aurez besoin du <strong>nom exact</strong> de l'extract que vous venez de publier, qui peut se
                    retrouver en allant sur votre source de données sur Tableau Online (il s’agit du nom que vous avez
                    renseigné en étape II.11).
                </h3>
            </div>
        </section>
    )
}