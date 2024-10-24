import LogOutButton from "@/components/LogOutButton";

export default async function PrivatePage() {

    return (
        <>
            <div>
                <h2>Bienvenue sur Aviv SP Helper !</h2>
                <p>Ce site est conçu afin de vous permettre d'accéder plus facilement à certaines informations, sous une
                    forme autre que des fichiers Google Sheets ou des rapports Salesforce.</p>
                <p>Vous y trouverez également une version Web de fichiers de résultats des différentes équipes Customer
                    Support.</p>
                <p>Ce projet est une expérimentation, en constante évolution. Les feedbacks sont bienvenus !</p>
                <h3>Accès rapide :</h3>
                <p><a href="/main/coeffective">Coeffective</a></p>
                <p><a href="/main/customer-support">Suivis Customer Support</a></p>
            </div>
            <LogOutButton/>
        </>
    )
}