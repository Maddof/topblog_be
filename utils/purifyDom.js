import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

// Sanitize HTML content using DOMPurify
const sanitizeHtml = (html) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(html);
};

export default sanitizeHtml;
