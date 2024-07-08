import PageProtection from "@/components/PageProtection";
import GoogleDriveChecker from "@/components/GoogleDriveChecker";

export default function CoeffectiveMain() {


    return (
        <div>
            <h1>Coeffective</h1>
            <h2>Guide rapide</h2>
            <p>Coeffective est une solution spécialement pensée pour les Business Analysts de la Sales Performance, leur
                permettant de faciliter l'export d'extracts depuis Salesforce et Flamingo et la mise à jour automatique
                de fichiers Google Sheets.</p>

            <p>Si c'est la toute première fois que vous utilisez Coeffective, veuillez d'abord cliquer sur <strong>Créer
                / Accéder au dossier Google Drive</strong> !</p>

            <p><a href="/main/coeffective/new">Créer un nouvel import d'extract</a></p>
            <p><a href="/main/coeffective/extracts">Gérer les imports existants</a></p>
            <p><a href="/main/coeffective/drive">Accéder au dossier Google Drive</a></p>
            <PageProtection/>
            <GoogleDriveChecker />
        </div>
    )
}