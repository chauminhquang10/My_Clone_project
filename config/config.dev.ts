// https://umijs.org/config/
import { defineConfig } from "umi";

export default defineConfig({
    plugins: [
        // https://github.com/zthxxx/react-dev-inspector
        "react-dev-inspector/plugins/umi/react-inspector",
    ],
    // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
    inspectorConfig: {
        exclude: [],
        babelPlugins: [],
        babelOptions: {},
    },
    define: {
        API_ENDPOINT: "https://api-stmc-ca-dev.hcm.unicloud.ai",
        API_PREFIX: "",
    },
    openAPI: [
        {
            requestLibPath: "import { request } from 'umi'",
            schemaPath: "https://api-stmc-ca-dev.hcm.unicloud.ai/v3/api-docs",
            projectName: "STM-APIs",
            // schemaPath: join(__dirname, 'oneapi.json'),
            mock: false,
        },
    ],
});
