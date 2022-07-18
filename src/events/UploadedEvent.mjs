import Event from './Event.mjs'

export default class UploadedEvent extends Event {
  /**
   * @param {PageDocument} document
   * @param {Page[]} pages
   */
  constructor({ document, pages }) {
    super();
    this.document = document
    this.pages = pages
  }
}