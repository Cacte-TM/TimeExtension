// Fonction pour obtenir l'heure UTC depuis une API
async function getUTCTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    return data.utc_datetime;
}

// Définition de l'extension pour TurboWarp
(function (Scratch) {
    'use strict';

    // Création de l'extension
    class TimeExtension {
        // Nom de l'extension
        getInfo() {
            return {
                id: 'timeExtension',
                name: 'Time Extension',
                blocks: [
                    {
                        opcode: 'getUTCTime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'obtenir l\'heure UTC',
                    },
                ],
            };
        }

        // Fonction associée au bloc
        async getUTCTime() {
            const utcTime = await getUTCTime();
            return utcTime;
        }
    }

    // Enregistrement de l'extension dans Scratch
    Scratch.extensions.register(new TimeExtension());
})(Scratch);