import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                Ultimo aggiornamento: <strong>25/02/2026</strong>
            </p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduzione</h2>
                <p>
                    Benvenuto su BoolB&B! La tua privacy è importante per noi. Questa
                    Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo le
                    tue informazioni personali quando utilizzi il nostro sito web e i
                    nostri servizi.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    2. Informazioni che raccogliamo
                </h2>
                <ul className="list-disc pl-6">
                    <li>Dati personali forniti direttamente dall'utente (nome, email, ecc.).</li>
                    <li>Informazioni sulle prenotazioni e transazioni.</li>
                    <li>Dati raccolti automaticamente (indirizzo IP, cookie, dati di navigazione).</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    3. Come utilizziamo i tuoi dati
                </h2>
                <p>Utilizziamo le informazioni raccolte per:</p>
                <ul className="list-disc pl-6">
                    <li>Fornire e gestire i servizi di BoolB&B.</li>
                    <li>Migliorare la tua esperienza utente.</li>
                    <li>Comunicazioni di servizio e supporto.</li>
                    <li>Finalità di sicurezza e prevenzione delle frodi.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Condivisione dei dati</h2>
                <p>
                    Non vendiamo né affittiamo i tuoi dati personali. Tuttavia, potremmo
                    condividere alcune informazioni con fornitori di servizi di pagamento,
                    partner di sicurezza e autorità competenti quando richiesto dalla
                    legge.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Sicurezza dei dati</h2>
                <p>
                    Adottiamo misure tecniche e organizzative per proteggere i tuoi dati
                    personali da accessi non autorizzati, perdita o divulgazione.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    6. I tuoi diritti sulla privacy
                </h2>
                <p>Hai il diritto di:</p>
                <ul className="list-disc pl-6">
                    <li>Accedere, modificare o cancellare i tuoi dati personali.</li>
                    <li>Opporsi al trattamento dei tuoi dati.</li>
                    <li>Richiedere la portabilità dei dati.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Modifiche alla Privacy Policy</h2>
                <p>
                    Ci riserviamo il diritto di aggiornare questa Privacy Policy. Ti
                    informeremo in caso di modifiche significative.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Contatti</h2>
                <p>
                    Per qualsiasi domanda sulla nostra Privacy Policy, puoi contattarci a:
                    <br />
                    <strong>Email:</strong> privacy@boolbnb.com
                    <br />
                    <strong>Indirizzo:</strong> zis@example.com
                </p>
            </section>

            <p className="mt-6 text-gray-600 text-sm">
                Copyright © {new Date().getFullYear()} BoolB&B. Tutti i diritti riservati.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
