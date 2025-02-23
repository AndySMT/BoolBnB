import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Termini e Condizioni</h1>
            <p className="mb-4">
                Ultimo aggiornamento: <strong>25/02/2026</strong>
            </p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduzione</h2>
                <p>
                    Benvenuto su BoolB&B! Utilizzando il nostro sito web e i nostri
                    servizi, accetti i seguenti Termini e Condizioni. Ti invitiamo a
                    leggerli attentamente prima di procedere.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. Definizioni</h2>
                <p>In questi Termini e Condizioni, si applicano le seguenti definizioni:</p>
                <ul className="list-disc pl-6">
                    <li><strong>"Piattaforma"</strong>: Il sito web e i servizi di BoolB&B.</li>
                    <li><strong>"Utente"</strong>: Qualsiasi persona che utilizza BoolB&B.</li>
                    <li><strong>"Host"</strong>: Utente che offre alloggi in affitto.</li>
                    <li><strong>"Ospite"</strong>: Utente che prenota un alloggio tramite BoolB&B.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Uso della piattaforma</h2>
                <p>
                    Per accedere ai servizi di BoolB&B, devi avere almeno 18 anni e
                    fornire informazioni veritiere durante la registrazione. Gli utenti si
                    impegnano a rispettare tutte le leggi e normative applicabili.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Responsabilità degli utenti</h2>
                <p>
                    Gli utenti sono responsabili per il contenuto che pubblicano, incluse
                    immagini e descrizioni degli alloggi. È vietato caricare contenuti
                    falsi, offensivi o ingannevoli.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Prenotazioni e pagamenti</h2>
                <ul className="list-disc pl-6">
                    <li>Tutte le prenotazioni sono soggette alla disponibilità dell’Host.</li>
                    <li>I pagamenti devono essere effettuati attraverso i metodi approvati da BoolB&B.</li>
                    <li>Le politiche di cancellazione variano in base all’Host e sono specificate nelle inserzioni.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Cancellazioni e rimborsi</h2>
                <p>
                    Gli Ospiti possono cancellare una prenotazione in base alle politiche
                    dell’Host. In caso di cancellazione da parte dell’Host, l’Ospite ha
                    diritto a un rimborso completo.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Limitazioni di responsabilità</h2>
                <p>
                    BoolB&B agisce come intermediario tra Host e Ospiti e non è responsabile
                    per danni, incidenti o dispute tra gli utenti. Gli utenti accettano di
                    utilizzare la piattaforma a proprio rischio.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Modifiche ai Termini</h2>
                <p>
                    Ci riserviamo il diritto di modificare questi Termini e Condizioni in
                    qualsiasi momento. L’uso continuato della piattaforma dopo le
                    modifiche implica l’accettazione delle nuove condizioni.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Contatti</h2>
                <p>
                    Per qualsiasi domanda sui Termini e Condizioni, puoi contattarci a:
                    <br />
                    <strong>Email:</strong> support@boolbnb.com
                    <br />
                    <strong>Indirizzo:</strong> Via Boolean 99
                </p>
            </section>

            <p className="mt-6 text-gray-600 text-sm">
                Copyright © {new Date().getFullYear()} BoolB&B. Tutti i diritti riservati.
            </p>
        </div>
    );
};

export default TermsAndConditions;
