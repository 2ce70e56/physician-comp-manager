"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-focus-guards@1.1.1_@types+react@18.3.18_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-focus-guards@1.1.1_@types+react@18.3.18_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.1_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-focus-guards/dist/index.mjs":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.1_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-focus-guards/dist/index.mjs ***!
  \**********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FocusGuards: () => (/* binding */ FocusGuards),\n/* harmony export */   Root: () => (/* binding */ Root),\n/* harmony export */   useFocusGuards: () => (/* binding */ useFocusGuards)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.0.3_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* __next_internal_client_entry_do_not_use__ FocusGuards,Root,useFocusGuards auto */ // packages/react/focus-guards/src/FocusGuards.tsx\n\nvar count = 0;\nfunction FocusGuards(props) {\n    useFocusGuards();\n    return props.children;\n}\nfunction useFocusGuards() {\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{\n        const edgeGuards = document.querySelectorAll(\"[data-radix-focus-guard]\");\n        document.body.insertAdjacentElement(\"afterbegin\", edgeGuards[0] ?? createFocusGuard());\n        document.body.insertAdjacentElement(\"beforeend\", edgeGuards[1] ?? createFocusGuard());\n        count++;\n        return ()=>{\n            if (count === 1) {\n                document.querySelectorAll(\"[data-radix-focus-guard]\").forEach((node)=>node.remove());\n            }\n            count--;\n        };\n    }, []);\n}\nfunction createFocusGuard() {\n    const element = document.createElement(\"span\");\n    element.setAttribute(\"data-radix-focus-guard\", \"\");\n    element.tabIndex = 0;\n    element.style.outline = \"none\";\n    element.style.opacity = \"0\";\n    element.style.position = \"fixed\";\n    element.style.pointerEvents = \"none\";\n    return element;\n}\nvar Root = FocusGuards;\n //# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LWZvY3VzLWd1YXJkc0AxLjEuMV9AdHlwZXMrcmVhY3RAMTguMy4xOF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1mb2N1cy1ndWFyZHMvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztxRkFFQSxrREFBa0Q7QUFDbkI7QUFDL0IsSUFBSUMsUUFBUTtBQUNaLFNBQVNDLFlBQVlDLEtBQUs7SUFDeEJDO0lBQ0EsT0FBT0QsTUFBTUUsUUFBUTtBQUN2QjtBQUNBLFNBQVNEO0lBQ1BKLDRDQUFlLENBQUM7UUFDZCxNQUFNTyxhQUFhQyxTQUFTQyxnQkFBZ0IsQ0FBQztRQUM3Q0QsU0FBU0UsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxjQUFjSixVQUFVLENBQUMsRUFBRSxJQUFJSztRQUNuRUosU0FBU0UsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxhQUFhSixVQUFVLENBQUMsRUFBRSxJQUFJSztRQUNsRVg7UUFDQSxPQUFPO1lBQ0wsSUFBSUEsVUFBVSxHQUFHO2dCQUNmTyxTQUFTQyxnQkFBZ0IsQ0FBQyw0QkFBNEJJLE9BQU8sQ0FBQyxDQUFDQyxPQUFTQSxLQUFLQyxNQUFNO1lBQ3JGO1lBQ0FkO1FBQ0Y7SUFDRixHQUFHLEVBQUU7QUFDUDtBQUNBLFNBQVNXO0lBQ1AsTUFBTUksVUFBVVIsU0FBU1MsYUFBYSxDQUFDO0lBQ3ZDRCxRQUFRRSxZQUFZLENBQUMsMEJBQTBCO0lBQy9DRixRQUFRRyxRQUFRLEdBQUc7SUFDbkJILFFBQVFJLEtBQUssQ0FBQ0MsT0FBTyxHQUFHO0lBQ3hCTCxRQUFRSSxLQUFLLENBQUNFLE9BQU8sR0FBRztJQUN4Qk4sUUFBUUksS0FBSyxDQUFDRyxRQUFRLEdBQUc7SUFDekJQLFFBQVFJLEtBQUssQ0FBQ0ksYUFBYSxHQUFHO0lBQzlCLE9BQU9SO0FBQ1Q7QUFDQSxJQUFJUyxPQUFPdkI7QUFLVCxDQUNGLGtDQUFrQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BoeXNpY2lhbi1jb21wLW1hbmFnZXIvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LWZvY3VzLWd1YXJkc0AxLjEuMV9AdHlwZXMrcmVhY3RAMTguMy4xOF9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1mb2N1cy1ndWFyZHMvZGlzdC9pbmRleC5tanM/MThhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuLy8gcGFja2FnZXMvcmVhY3QvZm9jdXMtZ3VhcmRzL3NyYy9Gb2N1c0d1YXJkcy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIEZvY3VzR3VhcmRzKHByb3BzKSB7XG4gIHVzZUZvY3VzR3VhcmRzKCk7XG4gIHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzR3VhcmRzKCkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkZ2VHdWFyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlZGdlR3VhcmRzWzBdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWRnZUd1YXJkc1sxXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGNvdW50Kys7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpLmZvckVhY2goKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgfVxuICAgICAgY291bnQtLTtcbiAgICB9O1xuICB9LCBbXSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb2N1c0d1YXJkKCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1yYWRpeC1mb2N1cy1ndWFyZFwiLCBcIlwiKTtcbiAgZWxlbWVudC50YWJJbmRleCA9IDA7XG4gIGVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gIHJldHVybiBlbGVtZW50O1xufVxudmFyIFJvb3QgPSBGb2N1c0d1YXJkcztcbmV4cG9ydCB7XG4gIEZvY3VzR3VhcmRzLFxuICBSb290LFxuICB1c2VGb2N1c0d1YXJkc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNvdW50IiwiRm9jdXNHdWFyZHMiLCJwcm9wcyIsInVzZUZvY3VzR3VhcmRzIiwiY2hpbGRyZW4iLCJ1c2VFZmZlY3QiLCJlZGdlR3VhcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9keSIsImluc2VydEFkamFjZW50RWxlbWVudCIsImNyZWF0ZUZvY3VzR3VhcmQiLCJmb3JFYWNoIiwibm9kZSIsInJlbW92ZSIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGFiSW5kZXgiLCJzdHlsZSIsIm91dGxpbmUiLCJvcGFjaXR5IiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwiUm9vdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.1_@types+react@18.3.18_react@18.3.1/node_modules/@radix-ui/react-focus-guards/dist/index.mjs\n");

/***/ })

};
;