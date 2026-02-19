import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_ECUrIpba.mjs';
import { manifest } from './manifest_CxM-ycXe.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/api/pcp-lead.astro.mjs');
const _page5 = () => import('./pages/api/signup.astro.mjs');
const _page6 = () => import('./pages/blog.astro.mjs');
const _page7 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page8 = () => import('./pages/contact.astro.mjs');
const _page9 = () => import('./pages/join.astro.mjs');
const _page10 = () => import('./pages/pcp-claims/eligibility.astro.mjs');
const _page11 = () => import('./pages/pcp-claims/how-it-works.astro.mjs');
const _page12 = () => import('./pages/pcp-claims.astro.mjs');
const _page13 = () => import('./pages/privacy-policy.astro.mjs');
const _page14 = () => import('./pages/terms.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/contact.ts", _page3],
    ["src/pages/api/pcp-lead.ts", _page4],
    ["src/pages/api/signup.ts", _page5],
    ["src/pages/blog/index.astro", _page6],
    ["src/pages/blog/[...slug].astro", _page7],
    ["src/pages/contact.astro", _page8],
    ["src/pages/join.astro", _page9],
    ["src/pages/pcp-claims/eligibility.astro", _page10],
    ["src/pages/pcp-claims/how-it-works.astro", _page11],
    ["src/pages/pcp-claims/index.astro", _page12],
    ["src/pages/privacy-policy.astro", _page13],
    ["src/pages/terms.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b7fb9c2a-de49-41d1-bbba-39bbd745e38e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
