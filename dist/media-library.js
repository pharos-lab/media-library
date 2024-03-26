import { openBlock as n, createElementBlock as l, createElementVNode as r } from "vue";
const _ = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [c, s] of o)
    t[c] = s;
  return t;
}, a = {}, i = { class: "media-library flex gap-2 h-full" }, d = /* @__PURE__ */ r("div", { class: "preview grow border" }, null, -1), f = /* @__PURE__ */ r("aside", { class: "gallery w-96 border" }, null, -1), p = [
  d,
  f
];
function h(e, o) {
  return n(), l("section", i, p);
}
const u = /* @__PURE__ */ _(a, [["render", h]]);
export {
  u as MediaLibrary
};
