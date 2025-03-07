import { getMetadata, wrapElement, replaceElementTag } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  window.tmp = block;
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  replaceElementTag(footer.getElementsByTagName('p')[0], 'div', 'footer-logo');
  wrapElement(footer.getElementsByTagName('ul')[0], 'div', 'footer-nav');
  wrapElement(footer.getElementsByTagName('p')[0], 'div', 'footer-social-links');
  footer.querySelector('div.footer-social-links').append(footer.getElementsByTagName('ul')[1])
  footer.querySelectorAll('.icon>img').forEach(ele => {ele.setAttribute('src',ele.getAttribute('src').replace('icons','images'))});
  wrapElement(footer.querySelectorAll('.default-content-wrapper > p'), 'div', 'footer-content');
  block.append(footer);
}
