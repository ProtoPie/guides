
import builder from "@daybrush/builder";
import compat from "rollup-plugin-react-compat";


const reactCompat = compat({
    useReactCompat: true,
});
const resolveReactCompat = compat({
    useReactCompat: true,
    resolveCompat: true,
});

const external = {
    "react-simple-compat": "react-simple-compat",
    "react-compat-guides": "react-compat-guides",
    "@egjs/component": "@egjs/component",
    "@daybrush/utils": "@daybrush/utils",
    "gesto": "gesto",
    "framework-utils": "framework-utils",
    "@egjs/agent": "eg.Agent",
    "@egjs/children-differ": "eg.ChildrenDiffer",
};
export default builder([
    {
        name: "Guides",
        input: "src/index.ts",
        output: "./dist/guides.js",
        plugins: [resolveReactCompat],

    },
    {
        name: "Guides",
        input: "src/index.ts",
        output: "./dist/guides.min.js",
        plugins: [resolveReactCompat],
        uglify: true,
    }
]);
