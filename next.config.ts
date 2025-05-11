import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";
const removeImports = require("next-remove-imports");

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
        turbo: {
            rules: {
                "*.md": {
                    options: {
                        esModule: false,
                    },
                },
            },
        },
    },

    images: {
        remotePatterns: [
            {
                hostname: "mnkroicwfgayhyxomjqt.supabase.co",
            },
        ],
    },
    output: "standalone",

    webpack: (config: webpack.Configuration) => {
        config.module?.rules?.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },
};
export default removeImports()(nextConfig);
