class Extension {
  constructor() {
    // Ce code est exécuté lorsqu'on crée une nouvelle instance de l'extension
    this.apiUrl = 'https://worldtimeapi.org/api/timezone/Etc/UTC'; // URL de l'API
  }

  // Cette fonction sera appelée depuis ton projet Scratch (TurboWarp)
  getUTCTime() {
    return fetch(this.apiUrl)  // Effectue la requête API pour récupérer l'heure UTC
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de réseau');
        }
        return response.json();  // Transforme la réponse en JSON
      })
      .then(data => {
        const utcTime = data.datetime; // Extraire l'heure UTC
        return utcTime; // Retourne l'heure UTC
      })
      .catch(error => {
        console.error('Erreur de fetch :', error);
        return 'Erreur'; // Retourne une erreur si la requête échoue
      });
  }

  // Fonction qui définit un bloc personnalisé dans l'extension
  getInfo() {
    return {
      id: 'utcTimeExtension', // Identifiant unique pour l'extension
      name: 'UTC Time Extension', // Nom de l'extension
      blocks: [
        {
          opcode: 'getUTCTime', // Le nom de la fonction qui sera appelée dans Scratch
          blockType: Scratch.BlockType.REPORTER,
          text: 'obtenir l\'heure UTC',
          arguments: {}
        }
      ]
    };
  }
}

// Enregistre l'extension
Scratch.extension.register(new Extension());
