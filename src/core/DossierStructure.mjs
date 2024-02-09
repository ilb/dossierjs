import DocumentStructure from './DocumentStructure.mjs';
import fs from 'fs';

import createDebug from 'debug';

const debug = createDebug('dossier');

export default class DossierStructure {
  constructor(uuid) {
    this.structurePath = `${process.env.DOSSIER_DOCUMENT_PATH}/dossier/${uuid}/index.json`;

    if (fs.existsSync(this.structurePath)) {
      this.#loadStructure();
    } else {
      this.documents = {};
    }
  }

  refresh() {
    this.#loadStructure();
  }

  save(type, documentStructure) {
    debug('путь до папки с index.json',this.structurePath)
    this.documents[type] = documentStructure;
    debug('запуск fs.writeFileSync')
    fs.writeFileSync(this.structurePath, JSON.stringify({
      uuid: this.uuid,
      lastModified: (new Date()).toISOString(),
      documents: this.documents
    }, null, 2))
    debug('создался index.json')
  }

  getDocumentStructure(type) {
    return new DocumentStructure(this.documents[type], this, type)
  }

  exists() {
    return !!this.documents.length();
  }

  #loadStructure() {
    const structure = JSON.parse(fs.readFileSync(this.structurePath));
    this.uuid = structure.uuid;
    this.documents = structure.documents;
  }
}
