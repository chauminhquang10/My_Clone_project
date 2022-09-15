import { Settings as LayoutSettings } from "@ant-design/pro-components";

const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    navTheme: "light",
    // 拂晓蓝
    primaryColor: "#1D2452",
    layout: "mix",
    contentWidth: "Fluid",
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    pwa: false,
    iconfontUrl: "",
    logo: "/logo/Logo.svg",
};

export default Settings;
