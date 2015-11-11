import { DOMParser } from 'xmldom';

let domParser = new DOMParser();
let parseXML = xml => domParser.parseFromString(xml, 'text/xml');

export default parseXML;
